class UsersController < ApplicationController
  get '/users' do
    users = User.all
    users.to_json()
  end

  post '/users/adduser' do
    _name = params[:name]
    _email = params[:email]
    _rank = params[:rank]
    _password = params[:password]

    if _name.present? && _email.present? && _rank.present? && _password.present?
      if User.exists?(email: _email)
        status 406
        message = { error: "Email currently in use" }
      else
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

  delete '/users/delete/:id' do
    user = User.find_by(id: params[:id])
    if user
      user.destroy
      message = { success: "User has been deleted successfully" }
    else
      status 404
      message = { error: "User not found" }
    end
    message.to_json()
  end


  patch '/users/changepassword/:id' do
    user = User.find_by(id: params[:id])
    if user
      current_password = params[:current_password]
      new_password = params[:new_password]

      if user.authenticate(current_password)
        user.update(password: new_password)
        message = { success: "Password has been changed successfully" }
      else
        status 406
        message = { error: "Incorrect current password" }
      end
    else
      status 404
      message = { error: "User not found" }
    end
    message.to_json()
  end

end
