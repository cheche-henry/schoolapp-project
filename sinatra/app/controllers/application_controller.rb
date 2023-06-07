class ApplicationController < Sinatra::Base
  set :session=>true

  use Rack::Session::Cookie,
  expire_after:86400


  get '/' do
    "Hello, World! Welcome"
  end
end
