class AddTreeDetailsToSpatials < ActiveRecord::Migration[7.1]
  def change
    add_column :spatials, :species, :integer
    add_column :spatials, :taps, :integer, default: 1, null: false
  end
end
