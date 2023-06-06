class ApplicationsController < ApplicationController 
    get '/applications' do
      "Hello, World! Welcome to applications"
    end

    post '/applications/addapplication' do
      _name = params[:name]
      _email = params[:email]
      _rank = params[:rank]
      _password = params[:password]
  
      if _name.present? && _email.present? && _rank.present? && _password.present?
          user = User.create(name: _name, email: _email, rank: _rank, password: _password)
          if user
            message = { success: "User has been created successfully" }
          else
            status 406
            message = { error: "Error creating the user" }
          end
        end
      else
        status 406
        message = { error: "All values are required" }
      end
  
      message.to_json()
    end
  end