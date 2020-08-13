# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Company.destroy_all

def findMeAmerica
  while true
    result = Geocoder.search([rand(26.0...50.0), rand(-124.0...-65.0)])
    if result.first.address && result.first.street && (result.first.village || result.first.city)
      break
    end
  end
  result.first
end

def findMeEurope
  while true
    result = Geocoder.search([rand(36.0...55.0), rand(-10.0...27.0)])
    if result.first.address && result.first.street && (result.first.village || result.first.city)
      break
    end
  end
  result.first
end

def userAvatar
  rand = rand(1...99)
  var = Faker::Boolean.boolean(true_ratio: 0.5) ? "women/#{rand}.jpg" : "men/#{rand}.jpg"
  "https://randomuser.me/api/portraits/#{var}"
end

companies = [
  {
    name: 'Job Hunter',
    logo: 'https://logopond.com/logos/b3958ca66429b7ca1c5af7d70e95ad78.png'
  },
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

50.times do
  Company.create(
    name: Faker::Company.name,
    logo: Faker::Company.logo
  )
end

course = ['Software Engineering', 'Data Science', 'Cybersecurity', 'UX/UI Design']
campus = ['Austin', 'Chicago', 'Denver', 'Houston', 'New York', 'San Francisco', 'Seattle', 'Washington, D.C.', 'London', 'Online']

Company.all.each do |company|
  rand(0..20).times do
    date = Faker::Date.in_date_period(year: rand(2012...2020), month: rand(1..12))
    address = Faker::Boolean.boolean(true_ratio: 0.1) ? findMeEurope : findMeAmerica
    User.create(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      avatar: userAvatar,
      cohort: "#{date.month}/#{date.year}",
      campus: campus[rand(0...campus.size)],
      course: course[rand(0...course.size)],
      company: company,
      street: address.street,
      city: address.city || address.village,
      postcode: address.postal_code,
      state: address.state,
      country: address.country
    )
  end
end
