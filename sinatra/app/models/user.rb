class User < ActiveRecord::Base
    has_secure_password
    has_many :courses
    has_many :students
end
