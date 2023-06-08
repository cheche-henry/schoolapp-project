ENV['RACK_ENV'] ||= "development"

# Require in Gems
require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

# Database configurations
configure do
  set :database, {
    adapter: 'postgresql',
    host: 'localhost',
    username: 'school',
    password: 'school',
    database: 'school'
  }
end

# Require all files in the 'app' directory
require_all 'app'
