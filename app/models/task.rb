class Task < ApplicationRecord
  belongs_to :list
  has_many :task_tags
  has_many :tags, through: :task_tags
  has_many :users, through: :list
  belongs_to :assigned_user, :class_name => "User", :foreign_key => :assigned_user_id

  validates :description, presence: true

end
