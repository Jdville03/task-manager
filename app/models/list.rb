class List < ApplicationRecord
  has_many :user_lists
  has_many :users, through: :user_lists
  has_many :tasks

  validates :name, presence: true

  def user_email=(email)
    if user = User.find_by(email: email)
      self.user_lists.create(user: user, permission: "collaborator") if !self.users.include?(user)
    end
  end

  def all_tasks_completed?
    !self.tasks.incomplete.any?
  end

  def shared_list?
    self.users.count >= 2
  end

  def user_permission(user)
    self.user_lists.find_by(user: user).permission
  end

  def owner
    self.user_lists.find_by(permission: "owner").user
  end

end
