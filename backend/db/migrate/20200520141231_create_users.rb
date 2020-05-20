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

      t.timestamps
    end
  end
end
