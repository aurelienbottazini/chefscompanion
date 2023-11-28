require_relative 'recipes/seed'

namespace :recipes do
  Recipes::Seed.define_task(:seed)
end
