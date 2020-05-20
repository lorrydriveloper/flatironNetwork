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
      render json: { status: 'error', message: "Can't find " }, status: :bad_request
    end
  end

  def create
    company = Company.new(company_params)
    if company.save
      render json: company, except: %i[created_at updated_at]
    else
      render json: {
        status: 404,
        message: 'Error saving on DB'
      }
    end
  end

  def update
    company = Company.friendly.find(params[:id])
    if company.update_attributes(company_params)
      render json: company, except: %i[created_at updated_at]
    else
      render json: {
        status: 404,
        message: 'Error saving on DB'
      }
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :logo, :address)
  end
end
