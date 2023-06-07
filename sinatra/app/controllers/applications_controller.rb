class ApplicationsController < ApplicationController
  get '/applications' do
    applications = Application.all
    applications.to_json()
  end

  post '/applications/addapplication' do
    _firstname = params[:firstname]
     _secondname = params[:lastname]
     _date_of_birth = params[:date_of_birth]
      _gender = params[:gender]
       _phone_number = params[:phone_number]
        _email = params[:email]
_course_title = params[:course_title]

   
  if _firstname.present? && _secondname.present? && _date_of_birth.present? && _gender.present? && _phone_number.present? && _email.present? && _course_title.present?
    if Course.exists?(title: _course_title)
      if Application.exists?(email: _email, course_title: _course_title)
        status 409
        message = { error: "You have already applied for this course." }
      else
        application = Application.create(firstname: _firstname, secondname: _secondname, date_of_birth: _date_of_birth, gender: _gender, phone_number: _phone_number, email: _email, course_title: _course_title)
        if application
          status 201
          message = { success: "Application has been sent successfully" }
        else
          status 500
          message = { error: "Error sending the application" }
        end
      end
    else
      status 406
      message = { error: "Invalid course title" }
    end
  else
    status 400
    message = { error: "All values are required" }
  end

  message.to_json()
  end

  delete '/applications/delete/:id' do
    if session[:user_id]
      application = Application.find_by(id: params[:id])
      if application
        application.destroy
        status 200
        message = { success: "Application has been deleted successfully" }
      else
        status 404
        message = { error: "Application not found" }
      end
    else
      status 401
      message = { error: "Not logged in" }
    end

    message.to_json()
  end
end
