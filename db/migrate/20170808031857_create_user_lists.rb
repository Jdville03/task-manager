class CreateUserLists < ActiveRecord::Migration[5.1]
  def change
    create_table :user_lists do |t|
      t.references :user, foreign_key: true
      t.references :list, foreign_key: true
      t.string :permission

      t.timestamps
    end
  end
end
