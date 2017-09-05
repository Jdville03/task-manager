module ApplicationHelper

  def active_class(link_path, alt_link_path = "", list_id = nil)
    "active" if current_page?(link_path) || current_page?(alt_link_path) || params[:list_id] == list_id.to_s
  end

  def disabled_link_class
    "disabled" if current_user.tasks.empty?
  end

  def display_sorted_tasks(list)
    session[:task_sort] = params[:task_sort] if params[:task_sort]
    if session[:task_sort] == "Sort Alphabetically"
      tasks = list.tasks.sorted_alphabetically
    elsif session[:task_sort] == "Sort by Priority"
      tasks = list.tasks.sorted_by_priority
    elsif session[:task_sort] == "Sort by Assignee"
      tasks = list.tasks.sorted_by_assignee
    else
      tasks = list.tasks.sorted_by_creation_date
    end
    session[:display_tasks_option] = params[:display_tasks_option] if params[:display_tasks_option]
    if session[:display_tasks_option] == "1"
      @tasks = tasks
    else
      @tasks = tasks.incomplete
    end
  end

  def url_for_lists_sort_form
    if current_page?(root_path) || current_page?(lists_path)
      lists_path
    elsif current_page?(tasks_path)
      tasks_path
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

end
