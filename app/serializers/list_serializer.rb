class ListSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :tasks

  def tasks
    if instance_options[:task_sort_option] == "Sort Alphabetically"
      sorted_tasks = object.tasks.sorted_alphabetically
    elsif instance_options[:task_sort_option] == "Sort by Priority"
      sorted_tasks = object.tasks.sorted_by_priority
    elsif instance_options[:task_sort_option] == "Sort by Assignee"
      sorted_tasks = object.tasks.sorted_by_assignee
    else
      sorted_tasks = object.tasks.sorted_by_creation_date
    end

    if instance_options[:display_tasks_option] == "1"
      sorted_tasks
    else
      sorted_tasks.incomplete
    end
  end

  has_many :users
end
