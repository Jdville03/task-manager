class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :priority, :due_date, :note
  belongs_to :list
  belongs_to :assigned_user
  has_many :users
end
