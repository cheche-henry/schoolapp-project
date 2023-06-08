class SessionController < ApplicationController
  post '/users/login' do
    email = params[:email]
    password = params[:password]
  
    if email.present? && password.present?
      user = User.find_by(email: email)
      if user && user.authenticate(password)
        session[:user_id] = user.id  # Set the session value here
        status 200
        message = { success: "Successfully logged in" }
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
  

  post '/users/logout' do
    session.delete(:user_id)
    status 200
    message = { success: "User logged out successfully" }
    message.to_json()
  end
end
