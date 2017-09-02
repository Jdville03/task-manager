class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

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

    def display_sorted_tasks
      session[:task_sort] = params[:task_sort] if params[:task_sort]
      if session[:task_sort] == "Sort Alphabetically"
        tasks = @list.tasks.sorted_alphabetically
      elsif session[:task_sort] == "Sort by Priority"
        tasks = @list.tasks.sorted_by_priority
      elsif session[:task_sort] == "Sort by Assignee"
        tasks = @list.tasks.sorted_by_assignee
      else
        tasks = @list.tasks
      end
      if session[:display_tasks] == "1"
        @tasks = tasks
      else
        @tasks = tasks.incomplete
      end
    end

end
