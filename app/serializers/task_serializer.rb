class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :priority, :due_date, :note, :list_id, :assigned_user, :users
  belongs_to :list
  belongs_to :assigned_user
  has_many :users
end
