# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Company.destroy_all
User.destroy_all

companies = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/235px-Google_%22G%22_Logo.svg.png'
  },
  {
    name: 'Flatiron School',
    logo: 'https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/999/s200/flatironschool.png'
  }, {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png'
  },
  {
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/240px-Facebook_icon.svg.png'
  }, {
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png'
  },
  {
    name: 'NASA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
  },
  {
    name: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/240px-Linkedin_icon.svg.png'
  }
]
Company.create(companies)

20.times do
  Company.create(
    name: Faker::Company.name,
    logo: Faker::Company.logo
  )
end

course = ['Software Engineering', 'Data Science', 'Cybersecurity', 'UX/UI Design']
campus = ['Austin', 'Chicago', 'Denver', 'Houston', 'New York', 'San Francisco', 'Seattle', 'Washington, D.C.', 'London', 'Online']

Company.all.each do |company|
  rand(0..20).times do
    date = Faker::Date.in_date_period(year: rand(2019...2020), month: rand(1..12))
    User.create(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      avatar: Faker::Avatar.image,
      cohort: "#{date.month}/#{date.year}",
      campus: campus[rand(0...campus.size)],
      course: course[rand(0...course.size)],
      company: company,
      work_location: campus[rand(0...campus.size)]
    )
  end
end
