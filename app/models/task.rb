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

  PRIORITY = {
    :normal => 0,
    :starred => 1
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

  def starred?
    self.priority == PRIORITY[:starred]
  end

  def normal?
    self.priority == PRIORITY[:normal]
  end

  def self.starred
    where(priority: PRIORITY[:starred])
  end

  def self.normal
    where(priority: PRIORITY[:normal])
  end

  def self.assigned_to_user(user)
    where(assigned_user: user)
  end

  def overdue?
    self.due_date < Time.zone.today
  end

  def due_today?
    self.due_date == Time.zone.today
  end

  def self.overdue
    where("due_date < ?", Time.zone.today)
  end

  def self.due_today
    where(due_date: Time.zone.today)
  end

  def self.sorted_alphabetically
    self.order('lower(description)')
  end

  def self.sorted_by_priority
    self.order(priority: :desc)
  end

  def self.sorted_by_assignee
    self.order(:assigned_user_id)
  end

  # tasks are sorted by creation date by default
  # def self.sorted_by_creation_date
  #   self.order(:created_at)
  # end

end
