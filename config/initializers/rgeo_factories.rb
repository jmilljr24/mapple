RGEO_FACTORY = RGeo::Geographic.simple_mercator_factory

# RGeo::ActiveRecord::SpatialFactoryStore.instance.tap do |config|
#   # By default, use the GEOS implementation for spatial columns.
#   config.default = RGeo::Geographic.simple_mercator_factory

#   # But use a geographic implementation for point columns.
#   # config.register(RGeo::Geographic.spherical_factory(srid: 4326), {has_z: true, geo_type: "st_point"})
# end
