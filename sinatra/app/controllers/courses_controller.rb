class CoursesController < ApplicationController
  get '/courses' do
    courses = Course.all
    courses.to_json(include: :user)
  end

  post '/courses/addcourse' do
    if session[:user_id]
      _title = params[:title]
      _description = params[:description]
      _image = params[:image]
      _user_id = params[:user_id]

      if _title.present? && _description.present? && _image.present? && _user_id.present?
        if User.exists?(id: _user_id)
          if Course.exists?(title: _title)
            status 406
            message = { error: "A course with the same title already exists" }
          else
            course = Course.create(title: _title, description: _description, image: _image, user_id: _user_id)
            if course
              message = { success: "Course has been created successfully" }
            else
              status 406
              message = { error: "Error creating the course" }
            end
          end
        else
          status 406
          message = { error: "Invalid user ID" }
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

  delete '/courses/delete/:id' do
    if session[:user_id]
      course = Course.find_by(id: params[:id])
      if course
        course.destroy
        message = { success: "Course has been deleted successfully" }
      else
        status 404
        message = { error: "Course not found" }
      end
    else
      status 401
      message = { error: "Not logged in" }
    end

    message.to_json()
  end
end
