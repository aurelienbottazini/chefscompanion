class AddFullsearch < ActiveRecord::Migration[7.1]
  def change
    enable_extension 'pg_trgm'
    enable_extension 'fuzzystrmatch'
    enable_extension 'unaccent'
  end
end
