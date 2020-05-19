# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
companies = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png',
    address: '1600 Amphitheatre Parkway Mountain View, CA 94043'
  }, 
  {
    name: 'Flatiron School',
    logo: 'https://en.wikipedia.org/wiki/Flatiron_School#/media/File:FS_wiki.png',
    address: '11 Broadway, 2nd Floor New York , NY 10004'
  },
    name: "Spotify USA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/240px-Spotify_logo_without_text.svg.png",
    address: "4 World Trade Center 150 Greenwich Street, 62nd Floor New York, NY 10007 USA",
]
Company.destroy_all
Company.create(companies)
