class Task < ApplicationRecord
  belongs_to :list
  has_many :task_tags
  has_many :tags, through: :task_tags
  has_many :users, through: :list
  belongs_to :assigned_user, :class_name => "User", :foreign_key => :assigned_user_id, optional: true

  validates :description, presence: true

  STATUS = {
    :incomplete => 0,
    :complete => 1
  }

  def complete?
    self.status == STATUS[:complete]
  end

  def incomplete?
    self.status == STATUS[:incomplete]
  end

  def self.completed
    where(status: STATUS[:complete])
  end

  def self.incomplete
    where(status: STATUS[:incomplete])
  end

  def self.assigned_to_user(user)
    where(assigned_user: user)
  end

end
