require 'rails_helper'

RSpec.describe "HomepageFlows", type: :system do
  before do
    driven_by(:rack_test)
  end

  it "works! (now write some real specs)" do
    visit "/"
    expect(page).to have_css('#logo')
  end
end
