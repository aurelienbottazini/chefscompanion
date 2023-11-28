class CreateIngredients < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients do |t|
      t.string :full_text, null: false, index: { unique: true }
      t.timestamps
    end
  end
end
