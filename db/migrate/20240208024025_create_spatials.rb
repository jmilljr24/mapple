class CreateSpatials < ActiveRecord::Migration[7.1]
  def change
    create_table :spatials do |t|
      t.st_point :lonlatheight, has_z: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
