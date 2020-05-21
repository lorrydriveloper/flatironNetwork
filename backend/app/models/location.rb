class Location < ApplicationRecord
  geocoded_by :address
  after_validation :geocode
  def address
    [street, city, zip, state, country].compact.join(', ')
  end
end
