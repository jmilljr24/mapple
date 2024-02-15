class AddGeographicLonlatheightToSpatials < ActiveRecord::Migration[7.1]
  def change
    add_column :spatials, :lonlatheight, :st_point, geographic: true, has_z: true
  end
end
