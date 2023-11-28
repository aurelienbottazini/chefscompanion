class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :cook_time, null: false
      t.integer :prep_time, null: false
      t.float :ratings, null: false
      t.string :image_url, null: false
      t.belongs_to :category, foreign_key: true
      t.timestamps
    end
  end
end
