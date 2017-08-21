class AddOwnerToLists < ActiveRecord::Migration[5.1]
  def change
    add_reference :lists, :owner, foreign_key: true
  end
end
