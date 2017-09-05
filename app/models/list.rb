class List < ApplicationRecord
  has_many :user_lists, :dependent => :destroy
  has_many :users, through: :user_lists
  has_many :tasks, :dependent => :destroy

  validates :name, presence: true

  def users_attributes=(user_attributes)
    user_attributes.values.each do |user_attribute|
      if user = User.find_by(user_attribute)
        self.user_lists.create(user: user, permission: "collaborator") if !self.users.include?(user)
      end
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

  def self.sorted_by_creation_date
    self.order(:created_at)
  end

  def self.sorted_alphabetically
    self.order("lower(name), created_at")
  end

  def self.sorted_by_incomplete_tasks
    self.order("tasks.incomplete.count DESC, created_at")
  end

end
