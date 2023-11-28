class RecipeIngredientsController < ApplicationController
  def show
    ingredients = Recipe.find(params[:id]).ingredients.select(:id, :full_text)
    render json: ingredients
  end
end
