require_relative "./config/environment"

# Our application
use CoursesController
use ApplicationsController
use UsersController
run ApplicationController
#bundle exec rerun -b "rackup config.ru"