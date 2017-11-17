class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  include ActionView::Helpers::UrlHelper

  def after_sign_in_path_for(resource)
    super resource
  end

  def require_logged_in
    redirect_to new_user_session_path unless user_signed_in?
  end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end

    def display_sorted_lists
      if params[:list_sort]
        session[:list_sort] = params[:list_sort]
      elsif current_page?(starred_tasks_path) || current_page?(my_assigned_tasks_path) || current_page?(overdue_tasks_path) || current_page?(due_today_tasks_path)
        session[:list_sort] = "Sort by Completion Date"
      end
      if session[:list_sort] == "Sort Alphabetically"
        @lists = current_user.lists.sorted_alphabetically
      elsif session[:list_sort] == "Sort by Incomplete Tasks"
        @lists = current_user.lists.sort_by{|list| [-list.tasks.incomplete.count, list.created_at]}
      else
        @lists = current_user.lists.sorted_by_creation_date
      end
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

end
