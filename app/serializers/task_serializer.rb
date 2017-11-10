class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :priority, :due_date, :note, :user_id, :list_id
end
