class CreateTaskTags < ActiveRecord::Migration[5.1]
  def change
    create_table :task_tags do |t|
      t.references :tag, foreign_key: true
      t.references :task, foreign_key: true

      t.timestamps
    end
  end
end
