ENV['RACK_ENV'] ||= "production"

# Require in Gems
require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

# Database configurations
configure do
  db = URI.parse(ENV['DATABASE_URL'] || 'postgres://school:XyrQjqva9ZAueFh3nQWdMGZBmTieBJiv@dpg-ci0usj64dad5j745bjog-a.oregon-postgres.render.com/school_eaeh')
  
  set :database, {
    adapter: 'postgresql',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.path[1..-1]
  }
end

# Require all files in the 'app' directory
require_all 'app'
