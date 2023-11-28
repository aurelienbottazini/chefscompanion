class IngredientsSearchController < ApplicationController
  def create
    recipes = Recipe.full_search_against_ingredients(params[:ingredients])
    render json: { recipes: recipes }
  end
end
