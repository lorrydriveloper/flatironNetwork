# frozen_string_literal: true

class Company < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  validates :logo, :name, presence: true
  has_many :users
end
