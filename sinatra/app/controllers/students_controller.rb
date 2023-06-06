class StudentsController < ApplicationController
  get '/students' do
    students = Student.all
    students.to_json()
  end

  post '/students/addstudent' do
    if session[:user_id]
      _firstname = params[:firstname]
      _secondname = params[:secondname]
      _date_of_birth = params[:date_of_birth]
      _gender = params[:gender]
      _phone_number = params[:phone_number]
      _email = params[:email]
      _course_title = params[:course_title]

      if _firstname.present? && _secondname.present? && _date_of_birth.present? && _gender.present? && _phone_number.present? && _email.present? && _course_title.present?
        if Course.exists?(title: _course_title)
          student = Student.create(firstname: _firstname, secondname: _secondname, date_of_birth: _date_of_birth, gender: _gender, phone_number: _phone_number, email: _email, course_title: _course_title)
          if student
            message = { success: "Student has been created successfully" }
          else
            status 406
            message = { error: "Error adding student" }
          end
        else
          status 406
          message = { error: "Invalid course title" }
        end
      else
        status 406
        message = { error: "All values are required" }
      end
    else
      status 401
      message = { error: "Not logged in" }
    end

    message.to_json()
  end

  delete '/students/delete/:id' do
    if session[:user_id]
      student = Student.find_by(id: params[:id])
      if student
        student.destroy
        message = { success: "Student has been deleted successfully" }
      else
        status 404
        message = { error: "Student not found" }
      end
    else
      status 401
      message = { error: "Not logged in" }
    end

    message.to_json()
  end
end
