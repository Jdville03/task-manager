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

    def display_sorted_lists
      session[:list_sort] = params[:list_sort] if params[:list_sort]
      if session[:list_sort] == "Sort Alphabetically"
        @lists = current_user.lists.sorted_alphabetically
      elsif session[:list_sort] == "Sort by Incomplete Tasks"
        @lists = current_user.lists.sort_by{|list| list.tasks.incomplete.count}.reverse
      else
        @lists = current_user.lists
      end
    end

end
