# frozen_string_literal: true

class Company < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :users
end
