require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  it { should validate_presence_of(:full_text) }

  it "can build a valid ingredient" do
    expect(build(:ingredient)).to be_valid
  end
end
