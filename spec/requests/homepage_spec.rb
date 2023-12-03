require 'rails_helper'

RSpec.describe "Homepages", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/homepage/index"
      expect(response).to have_http_status(:success)
      expect(response.content_type).to eq("text/html; charset=utf-8")
      expect(response.body).to include("/assets/chefscompanion")
    end
  end
end
