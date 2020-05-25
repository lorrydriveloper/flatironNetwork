# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def index
    users = User.all

    render json: users.reverse, except: %i[created_at updated_at]
  end

  def create
    user = User.new(user_params)
    user.company = Company.friendly.find(params[:user][:company])
    if user.save
      render json: user, except: %i[created_at updated_at]
    else
      render json: { status: 'error', message: "#{user.errors.full_messages.join(',')} " }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :avatar, :remote_work,
                                 :cohort, :campus, :course, :street,
                                 :city, :postcode, :state, :country)
  end
end
