class User < ApplicationRecord
  has_many :user_lists
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists
  has_many :assigned_tasks, :class_name => "Task", :foreign_key => :user_id

  validates :name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.name = auth.info.name
      user.password = Devise.friendly_token[0,20]
    end
  end

  def incomplete_tasks
    self.tasks.incomplete
  end

  def starred_tasks
    self.tasks.starred
  end

  def overdue_tasks
    self.tasks.overdue
  end

  def due_today_tasks
    self.tasks.due_today
  end

end
