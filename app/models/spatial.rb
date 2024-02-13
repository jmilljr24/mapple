class Spatial < ApplicationRecord
  belongs_to :user

  validates :lonlatheight, presence: true
end
