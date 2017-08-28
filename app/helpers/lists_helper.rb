module ListsHelper

  def number_of_completed_tasks(list)
    list.tasks.completed.count
  end

  def number_of_incomplete_tasks(list)
    list.tasks.incomplete.count
  end

  def number_of_incomplete_starred_tasks(list)
    list.tasks.incomplete.starred.count
  end

  def number_of_incomplete_tasks_assigned_to_user(list, user)
    list.tasks.incomplete.assigned_to_user(user).count
  end

end
