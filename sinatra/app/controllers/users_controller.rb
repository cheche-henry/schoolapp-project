class UsersController < ApplicationController
  get '/users' do
    users = User.all
    users.to_json()
  end

  post '/users/login' do
    _email = params[:email]
    _password = params[:password]
  
    if _email.present? && _password.present?
      user = User.find_by(email: _email)
      if user && user.authenticate(_password)
        session[:user_id] = user.id  # Set the session value here
        status 200
        message = { 
          success: "Successfully logged in",
          user: user.as_json(only: [:id, :name, :email, :rank]) # Include all user details in the response
        }
      else
        status 401
        message = { error: "Incorrect login credentials" }
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
      status 406
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
  

  get '/currentuser' do
    user = User.find_by(id: session[:user_id])
    if user
      { user: user }.to_json()
    else
      status 404
      message = { error: "Not logged in" }
      message.to_json()
    end
  end
  
end
