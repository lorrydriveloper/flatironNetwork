# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def index
    students = User.all

    render json: students, except: %i[created_at updated_at]
  end
end
