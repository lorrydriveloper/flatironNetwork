# frozen_string_literal: true

class User < ApplicationRecord
  geocoded_by :address
  after_validation :geocode
  belongs_to :company
  before_save { self.email = email.downcase }
  validates :email, presence: true, uniqueness: true
  validates :street, :city, :postcode, :country, presence: true

  def address
     [street, city, postcode, state, country].compact.join(', ')
  end
end
