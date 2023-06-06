class ApplicationController < Sinatra::Base
  set :session=>true

  use Rack::Session::Cookie,
  expire_after:3600


  get '/' do
    "Hello, World! Welcome"
  end
end
