module Recipes
class Seed < Rake::Task
  def needed?
    true
  end

  def execute(args=nil)
   puts "Seeding recipes..."
  end
end
end
