class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :cook_time, presence: true
  validates :prep_time, presence: true
  validates :ratings, presence: true
  validates :image_url, presence: true
end
