require 'rails_helper'

RSpec.describe "IngredientsSearches", type: :request do
  describe "GET /create" do
    context "with no ingredients" do
      it "returns http success" do
        get "/ingredients_search/create"
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq("application/json; charset=utf-8")
        expect(JSON.parse(response.body)["recipes"]).to eq([])
      end
    end
  end
end
