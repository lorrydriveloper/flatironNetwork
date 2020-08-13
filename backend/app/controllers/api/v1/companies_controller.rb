# frozen_string_literal: true

class Api::V1::CompaniesController < ApplicationController
  def index
    companies = Company.all
    render json: companies, include: :users
  end

  def show
    company = Company.friendly.find(params[:id])
    if company
      render json: company, except: %i[created_at updated_at], include: :users
    else
      render json: { error: "Can't find ", message: "Sorry, we can't find that company in our records" }, status: :bad_request
    end
    
  end

  def create
    company = Company.new(company_params)
    if company.save
      render json: company, except: %i[created_at updated_at], include: :users
    else
      render json: {
        error: 'Unable to save entity',
        message: company.errors.full_messages.join(', ').to_s,
        status: :bad_request
      }
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :logo)
  end
end
