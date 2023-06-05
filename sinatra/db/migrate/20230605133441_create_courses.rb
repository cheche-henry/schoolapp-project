class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.string :image
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end

