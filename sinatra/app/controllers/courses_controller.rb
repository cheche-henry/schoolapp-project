class CoursesController < ApplicationController
  get '/courses' do
    courses = Course.all
    courses.to_json()
  end

  post '/courses/addcourse' do
    _title = params[:title]
    _description = params[:description]
    _image = params[:image]
    _user_id = params[:user_id]

    if _title.present? && _description.present? && _image.present? && _user_id.present?
      if User.exists?(id: _user_id)
        course = Course.create(title: _title, description: _description, image: _image, user_id: _user_id)
        if course
          message = { success: "Course has been created successfully" }
        else
          status 406
          message = { error: "Error creating the course" }
        end
      else
        status 406
        message = { error: "Invalid user ID" }
      end
    else
      status 406
      message = { error: "All values are required" }
    end

    message.to_json()
  end
end
