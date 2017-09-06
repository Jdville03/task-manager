module TasksHelper

  def form_for_task_status(task)
    form_for([task.list, task]) do |f|
      f.check_box :status, :class => "toggle-status", :checked => task.complete?
    end
  end

  def li_class_for_task(task)
    if task.complete? && current_page?(edit_list_task_path(task.list, task))
      "completed selected"
    elsif task.complete?
      "completed"
    elsif current_page?(edit_list_task_path(task.list, task))
      "selected"
    end
  end

  def form_for_task_priority(task)
    form_for([task.list, task]) do |f|
      f.check_box :priority, :class => "toggle-priority", :checked => task.starred?
    end
  end

  def calendar_icon_class(task)
    if Time.zone.today > task.due_date
      "fa fa-calendar-times-o fa-fw text-danger"
    elsif Time.zone.today == task.due_date
      "fa fa-calendar-check-o fa-fw text-warning"
    else
      "fa fa-calendar-o fa-fw"
    end
  end

  def calendar_tooltip(task)
    if (Time.zone.today > task.due_date) && task.incomplete?
      "Overdue #{task.due_date.strftime('%m/%d/%Y')}"
    elsif Time.zone.today == task.due_date
      "Due today"
    elsif Time.zone.tomorrow == task.due_date
      "Due tomorrow"
    else
      "Due on #{task.due_date.strftime('%m/%d/%Y')}"
    end
  end

  def tasks_index_heading_icon
    if current_page?(tasks_path)
      "square-o"
    elsif current_page?(starred_tasks_path)
      "star"
    elsif current_page?(my_assigned_tasks_path)
      "user text-primary"
    elsif current_page?(overdue_tasks_path)
      "calendar-times-o text-danger"
    elsif current_page?(due_today_tasks_path)
      "calendar-check-o text-warning"
    end
  end

  def tasks_index_heading_title
    if current_page?(tasks_path)
      "All Tasks"
    elsif current_page?(starred_tasks_path)
      "Starred Tasks"
    elsif current_page?(my_assigned_tasks_path)
      "Tasks Assigned To Me <small>(from shared lists)</small>".html_safe
    elsif current_page?(overdue_tasks_path)
      "Overdue Tasks"
    elsif current_page?(due_today_tasks_path)
      "Tasks Due Today"
    end
  end

  def tasks_index_heading_badge
    if current_page?(tasks_path)
      user_incomplete_tasks_count(current_user)
    elsif current_page?(starred_tasks_path)
      user_incomplete_starred_tasks(current_user)
    elsif current_page?(my_assigned_tasks_path)
      user_incomplete_assigned_tasks(current_user)
    elsif current_page?(overdue_tasks_path)
      user_incomplete_overdue_tasks(current_user)
    elsif current_page?(due_today_tasks_path)
      user_incomplete_due_today_tasks(current_user)
    end
  end

  def tasks_index_list_filter(list)
    if current_page?(tasks_path)
      list.tasks.any?
    elsif current_page?(starred_tasks_path)
      list.tasks.starred.any?
    elsif current_page?(my_assigned_tasks_path)
      list.shared_list? && list.tasks.assigned_to_user(current_user).any?
    elsif current_page?(overdue_tasks_path)
      list.tasks.overdue.any?
    elsif current_page?(due_today_tasks_path)
      list.tasks.due_today.any?
    end
  end

  def tasks_index_list_item_badge(list)
    if current_page?(tasks_path)
      number_of_incomplete_tasks(list) if !list.all_tasks_completed?
    elsif current_page?(starred_tasks_path)
      number_of_incomplete_starred_tasks(list) if list.tasks.incomplete.starred.any?
    elsif current_page?(my_assigned_tasks_path)
      number_of_incomplete_tasks_assigned_to_user(list, current_user) if list.tasks.incomplete.assigned_to_user(current_user).any?
    elsif current_page?(overdue_tasks_path)
      number_of_incomplete_tasks_overdue(list) if list.tasks.incomplete.overdue.any?
    elsif current_page?(due_today_tasks_path)
      number_of_incomplete_tasks_due_today(list) if list.tasks.incomplete.due_today.any?
    end
  end

  def tasks_index_list_tasks_collection(list)
    if current_page?(tasks_path)
      display_sorted_tasks(list)
    elsif current_page?(starred_tasks_path)
      display_sorted_tasks(list).starred
    elsif current_page?(my_assigned_tasks_path)
      display_sorted_tasks(list).assigned_to_user(current_user)
    elsif current_page?(overdue_tasks_path)
      display_sorted_tasks(list).overdue
    elsif current_page?(due_today_tasks_path)
      display_sorted_tasks(list).due_today
    end
  end

  def url_for_tasks_sort_form
    if current_page?(tasks_path)
      tasks_path
    elsif current_page?(starred_tasks_path)
      starred_tasks_path
    elsif current_page?(my_assigned_tasks_path)
      my_assigned_tasks_path
    elsif current_page?(overdue_tasks_path)
      overdue_tasks_path
    elsif current_page?(due_today_tasks_path)
      due_today_tasks_path
    end
  end

  def url_for_display_tasks_option_form
    if current_page?(tasks_path)
      tasks_path
    elsif current_page?(starred_tasks_path)
      starred_tasks_path
    elsif current_page?(my_assigned_tasks_path)
      my_assigned_tasks_path
    elsif current_page?(overdue_tasks_path)
      overdue_tasks_path
    elsif current_page?(due_today_tasks_path)
      due_today_tasks_path
    end
  end

end
