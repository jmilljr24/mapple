# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.first

points = [
  [-75.0143314, 42.5048307, 499.5],
  [-75.0142673, 42.5047931, 499.1999816894531],
  [-75.0142294, 42.5047701, 499.5],
  [-75.0140089, 42.5047148, 499.1999816894531],
  [-75.0139934, 42.5047123, 499.1999816894531],
  [-75.0139498, 42.5048879, 499.1999816894531],
  [-75.0139338, 42.5048786, 499.5],
  [-75.0139442, 42.5047893, 499.5],
  [-75.0139323, 42.5047836, 499.5],
  [-75.0135995, 42.504825, 499.6000061035156],
  [-75.0136071, 42.5048114, 496.7109728311624],
  [-75.013609, 42.504808, 496.815998143246],
  [-75.0136492, 42.5048017, 494.5349687379131],
  [-75.0135735, 42.5047383, 496.6211068474827],
  [-75.013554, 42.5046988, 494.63942578668286],
  [-75.0135756, 42.5046247, 495.3728263857207],
  [-75.0135908, 42.5046483, 494.7963844008808],
  [-75.0136413, 42.504623, 492.83028223489885],
  [-75.0138313, 42.504587, 493.6252186568031],
  [-75.0138666, 42.5045996, 491.83198261457915],
  [-75.0138944, 42.5048196, 499.1999816894531]
]

points.each do |point|
  s = user.spatials.build(lonlatheight: "POINT (#{point[0]} #{point[1]} #{point[2]})")
  p s.save
end
