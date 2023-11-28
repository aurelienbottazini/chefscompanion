require 'rake'
require 'json'
require_relative '../../../config/environment'

module Recipes
  class RecipeParser

    def initialize(json_path)
      @json_path = json_path
    end

    def all
      each_recipe.to_a
    end

    def each_recipe
      return to_enum(__callee__) unless block_given?

      # hint: consider yajl-ruby if json is too big
      recipes = JSON.parse(File.read(@json_path, encoding: 'UTF-8'))
      recipes.each do |r|
        yield r
      end

    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
    rescue Errno::ENOENT => e
      puts "File not found: #{e.message}"
    end
  end

  class Seed < Rake::Task
    def needed?
      Recipe.count.zero?
    end

    def execute(args=nil)
      puts "Seeding recipes..."
      RecipeParser.new('./resources/recipes-en.json').all.each do |recipe|
        seed_with_sql(recipe)
      end
    end

    private

    # time on macbook air m1: 3m 17s
    def seed_with_active_record(recipe)
      ingredients = []
      recipe['ingredients'].each do |ingredient|
        ingredients << Ingredient.find_or_create_by(full_text: ingredient)
      end

      c = nil
      c = Category.find_or_create_by(name: recipe['category']) unless  recipe['category'].blank?
      keys_to_exclude = %w[author cuisine ingredients category]
      selected_keys = recipe.reject { |key| keys_to_exclude.include?(key) }
      r = selected_keys.transform_keys do |key|
        case key
        when 'image'
          :image_url
        else
          key
        end
      end
      recipe = Recipe.new(r)
      recipe.category = c
      recipe.ingredients = ingredients
      begin
        recipe.save!
      rescue StandardError => e
        puts recipe
        throw e
      end
    end

    # time on macbook air m1: 17 seconds
    # [todo] batch insert with prepared statements
    def seed_with_sql(recipe)
        formatted_ingredients = recipe['ingredients'].uniq.map { |x| "('#{x.gsub(%q('), %Q(''))}', now(), now())"}.join(',')
        # p formatted_ingredients
        sql = "WITH inserted_ingredients AS (
                                     INSERT INTO ingredients (full_text, created_at, updated_at)
      VALUES
      #{formatted_ingredients}
      ON CONFLICT (full_text) DO UPDATE
      SET full_text = EXCLUDED.full_text
      RETURNING id
      ),
        inserted_category AS (
                               INSERT INTO categories (name, created_at, updated_at)
      VALUES ('#{recipe['category'].gsub(%q('), %Q(''))}', now(), now())
      ON CONFLICT (name) DO UPDATE
      SET name = EXCLUDED.name
      RETURNING id
      ),
        inserted_recipe AS (
                             INSERT INTO recipes (title, cook_time, prep_time, ratings, image_url, category_id, created_at, updated_at)
      SELECT '#{recipe['title'].gsub(%q('), %Q(''))}', #{recipe['cook_time']}, #{recipe['prep_time']}, #{recipe['ratings']}, '#{recipe['image']}', id, now(), now()
      FROM inserted_category
      RETURNING id
      )
      INSERT INTO ingredients_recipes (recipe_id, ingredient_id, created_at, updated_at)
      SELECT r.id, i.id, now(), now()
      FROM inserted_recipe r
      CROSS JOIN inserted_ingredients i;"
        begin
          ActiveRecord::Base.connection.execute(sql)
        rescue ActiveRecord::StatementInvalid => e
          puts sql
          throw e
        end
    end
  end
end