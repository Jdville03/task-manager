class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.string :status
      t.date :due_date
      t.text :note
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
