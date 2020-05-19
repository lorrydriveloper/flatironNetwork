# frozen_string_literal: true

class CompaniesController < ApplicationController
  def index
    companies = Company.all
    render json: companies, except: %i[created_at updated_at]
  end

  def show
    company = Company.find(params[:id])
    render json: company, except: %i[created_at updated_at]
  end

  def create
    pry
    # company = Company.new(company_params)
    # if @company.save
    #   render json: company, except: %i[created_at updated_at]
    # else
    #   render json: { message: 'Error saving on DB' }
    # end
  end

  private

  def company_params
    params.require(:company).permit(:name, :logo, :address)
  end
end
