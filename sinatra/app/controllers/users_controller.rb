class UsersController < ApplicationController 
    get '/users' do
      users = User.all
      users.to_json()
    end

    post '/users/adduser' do
      _name=params[:name]
      _email=params[:email]
      _rank=params[:rank]
      _password=params[:password]

      user = User.create(name: _name, email: _email, rank: _rank, password: _password)

      if user
        message = {:success=> "User has been created successfully"}
        message.to_json()
      else
        message = {:error=> "Error creating the user"}
        message.to_json()

      end
    end
  end