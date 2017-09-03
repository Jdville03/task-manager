module ApplicationHelper

  def active_class(link_path, alt_link_path = "", list_id = nil)
    "active" if current_page?(link_path) || current_page?(alt_link_path) || params[:list_id] == list_id.to_s
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
      tasks = list.tasks
    end
    session[:display_tasks_option] = params[:display_tasks_option] if params[:display_tasks_option]
    if session[:display_tasks_option] == "1"
      @tasks = tasks
    else
      @tasks = tasks.incomplete
    end
  end

end
