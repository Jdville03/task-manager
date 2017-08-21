class List < ApplicationRecord
  has_many :user_lists
  has_many :users, through: :user_lists
  has_many :tasks
  belongs_to :owner, :class_name => "User", :foreign_key => :owner_id, optional: true

  validates :name, presence: true

  def all_tasks_completed?
    !self.tasks.incomplete.any?
  end

  def shared_list?
    self.users.count >= 2
  end

end
