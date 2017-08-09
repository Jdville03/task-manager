class List < ApplicationRecord
  has_many :user_lists
  has_many :users, through: :user_lists
  has_many :tasks

  validates :name, presence: true

end
