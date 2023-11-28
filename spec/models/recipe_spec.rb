require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:cook_time) }
  it { should validate_presence_of(:prep_time) }
  it { should validate_presence_of(:ratings) }
  it { should validate_presence_of(:image_url) }

  it "can build a valid Recipe" do
    expect(build(:recipe)).to be_valid
  end

end
