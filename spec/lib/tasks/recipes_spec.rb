require 'rake'
require 'spec_helper'  # Require this if you have a spec helper file

RSpec.describe 'Recipes tasks' do
  before :all do
    Rake.application.rake_require 'lib/tasks/recipes', [Rails.root.to_s]
    Rake::Task.define_task(:environment)
  end

  describe 'recipes::seed' do
    after :each do
      Rake::Task['recipes:seed'].reenable
    end
    it 'executes successfully' do
      expect { Rake::Task['recipes:seed'].invoke }.not_to raise_error
    end
  end
end
