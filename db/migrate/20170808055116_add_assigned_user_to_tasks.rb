class AddAssignedUserToTasks < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :assigned_user, foreign_key: true
  end
end
