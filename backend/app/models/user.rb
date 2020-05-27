# frozen_string_literal: true

class User < ApplicationRecord
  geocoded_by :address
  before_validation :geocode
  belongs_to :company
  before_save { self.email = email.downcase }
  validates :email, presence: true, uniqueness: true
  validates :street, :city, :avatar, :postcode, :country, presence: true
  validates :latitude, presence: {
    message: 'sorry unable to Geolocate that address try a more general one'
  }

  def address
    [street, city, postcode, state, country].compact.join(', ')
  end

end
