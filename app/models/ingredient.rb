class Ingredient < ApplicationRecord
  validates :full_text, presence: true, uniqueness: true
  has_and_belongs_to_many :recipes
end
