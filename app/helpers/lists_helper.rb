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

  def delete_user_from_list_confirmation(user, list)
    if user == current_user
      "Do you really want to leave the #{list.name} list?"
    else
      "Do you really want to remove #{user.name} from the #{list.name} list?"
    end
  end

  def number_of_incomplete_tasks_overdue(list)
    list.tasks.incomplete.overdue.count
  end

  def number_of_incomplete_tasks_due_today(list)
    list.tasks.incomplete.due_today.count
  end


  def select_tag_for_task_sort(list)
    if list.shared_list?
      select_tag :task_sort, options_for_select(["Sort by Creation Date", "Sort Alphabetically", "Sort by Priority", "Sort by Assignee"], selected: params[:task_sort]), class: "edit-input"
    else
      select_tag :task_sort, options_for_select(["Sort by Creation Date", "Sort Alphabetically", "Sort by Priority"], selected: params[:task_sort]), class: "edit-input"
    end
  end

  def checked_option_for_display_tasks
    if session[:display_tasks] == "1"
      true
    else
      false
    end
  end

end
