module ListsHelper

  def number_of_completed_tasks(list)
    list.tasks.completed.count
  end

  def number_of_incomplete_tasks(list)
    list.tasks.incomplete.count
  end

  def number_of_tasks_assigned_to_user(list, user)
    list.tasks.assigned_to_user(user).count
  end

  # def list_group_item_class(list)
  #   if list.all_tasks_completed?
  #     "list-group-item list-group-item-success"
  #   else
  #     "list-group-item"
  #   end
  # end

end
