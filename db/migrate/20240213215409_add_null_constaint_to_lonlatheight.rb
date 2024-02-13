class AddNullConstaintToLonlatheight < ActiveRecord::Migration[7.1]
  def change
    change_column_null :spatials, :lonlatheight, false
  end
end
