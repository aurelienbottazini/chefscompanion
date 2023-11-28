FactoryBot.define do
  factory :recipe do
    title { "Golden Sweet Cornbread" }
    cook_time { 25 }
    prep_time { 10 }
    ratings { 4.74 }
    image_url { "https://assets.afcdn.com/recipe/20200219/107902_w314h314c1cx4330cy2886cxt0cyt0cxb8660cyb5773.webp" }
    category
    ingredients { [build(:ingredient)] }
  end
end
