class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :cook_time, null: false
      t.integer :prep_time, null: false
      t.integer :ratings, null: false
      t.string :image_url, null: false
      t.timestamps
    end
  end
end
