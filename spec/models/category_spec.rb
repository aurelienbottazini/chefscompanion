require 'rails_helper'

RSpec.describe Category, type: :model do
  it { should validate_presence_of(:name) }

  it "can build a valid Category" do
    expect(build(:category)).to be_valid
  end
end
