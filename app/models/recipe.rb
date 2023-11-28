class Recipe < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :full_search_against_ingredients, associated_against: {
    ingredients: [:full_text],
  }

  validates :title, presence: true
  validates :cook_time, presence: true
  validates :prep_time, presence: true
  validates :ratings, presence: true
  validates :image_url, presence: true
  validates :ingredients, presence: true


  has_and_belongs_to_many :ingredients
  belongs_to :category, optional: true

  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :category

end
