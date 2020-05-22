# frozen_string_literal: true

class User < ApplicationRecord
  geocoded_by :address
  after_validation :geocode
  belongs_to :company

  def address
    [street, city, postcode, state, country].compact.join(', ')
end
end
