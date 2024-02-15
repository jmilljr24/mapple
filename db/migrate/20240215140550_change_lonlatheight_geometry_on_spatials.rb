class ChangeLonlatheightGeometryOnSpatials < ActiveRecord::Migration[7.1]
  def change
    remove_column :spatials, :lonlatheight
  end
end
