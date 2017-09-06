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

end
