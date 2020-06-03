# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def index
    users = User.all

    render json: users.reverse,
           include: {
             company: {
               only: %i[name logo slug]
             }
           },
           except: %i[updated_at created_at]
  end

  def create
    user = User.new(user_params)
    user.company = Company.friendly.find(params[:user][:company])
    if user.save
      render json: user,
             include: {
               company: {
                 only: %i[name logo slug]
               }
             },
             except: %i[updated_at created_at]
    else
      render json: {
        error: 'Unable to save entity',
        message: "#{user.errors.full_messages.join(', ')} ",
        status: :bad_request
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :avatar, :remote_work,
                                 :cohort, :campus, :course, :street,
                                 :city, :postcode, :state, :country)
  end
end
