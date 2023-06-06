class CreateApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :applications do |t|
      t.string :firstname
      t.string :secondname
      t.string :date_of_birth
      t.string :gender
      t.integer :phone_number
      t.string :email
      t.string :course_title
      t.timestamps
    end
  end
end
