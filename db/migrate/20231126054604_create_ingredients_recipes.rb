class CreateIngredientsRecipes < ActiveRecord::Migration[7.1]
  create_table :ingredients_recipes, id: false do |t|
    t.bigint :recipe_id
    t.bigint :ingredient_id
    t.timestamps
    # t.index [:recipe_id, :ingredient_id], unique: true, name: 'index_ingredients_recipes_on_recipe_id_and_ingredient_id'
  end
end
