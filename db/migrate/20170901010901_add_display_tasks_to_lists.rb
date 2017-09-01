class AddDisplayTasksToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :display_tasks, :integer, default: 1
  end
end
