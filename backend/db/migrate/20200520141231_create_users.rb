class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.belongs_to :company, null: false, foreign_key: true
      t.string :work_location
      t.string :name
      t.string :email
      t.string :avatar
      t.string :cohort
      t.string :campus
      t.string :course
      t.string :street
      t.string :city
      t.string :postcode
      t.string :state
      t.string :country
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end
