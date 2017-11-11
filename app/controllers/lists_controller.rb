class ListsController < ApplicationController
  before_action :require_logged_in
  before_action :set_list, only: [:show, :edit, :update, :destroy]

  def index
    @list = List.new
    display_sorted_lists
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @lists}
    end
  end

  def show
    display_sorted_lists
    @task = Task.new
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @list}
    end
  end

  def create
    @list = List.new(list_params)
    if @list.save
      current_user.user_lists.create(list: @list, permission: "owner")
      # redirect_to list_path(@list)
      render json: @list, status: 201
    else
      display_sorted_lists
      render :index
    end
  end

  def edit
    display_sorted_lists
    @task = Task.new
  end

  def update
    @list.update(list_params)
    error_message_for_sharing_list(list_params)
    redirect_back(fallback_location: list_path(@list))
  end

  def destroy
    if params[:user_id]
      @user = User.find(params[:user_id])
      @list.users.delete(@user)
      remove_assigned_user_association
      flash_message_for_removed_user
    else
      @list.destroy
      flash[:notice] = "#{@list.name.upcase} list deleted successfully."
      redirect_to root_path
    end
  end

  private

    def list_params
      params.require(:list).permit(:name, users_attributes: [:email])
    end

    def set_list
      @list = List.find(params[:id])
    end

    def error_message_for_sharing_list(list_params)
      email = list_params.dig(:users_attributes, "0", :email)
      if email.present? && !User.all.include?(User.find_by(email: email))
        flash[:alert] = "There is no user associated with #{email}."
      end
    end

    def remove_assigned_user_association
      if !@list.shared_list?
        @list.tasks.each do |task|
          task.update(assigned_user: nil)
        end
      elsif tasks = @list.tasks.assigned_to_user(@user)
        tasks.each do |task|
          task.update(assigned_user: nil)
        end
      end
    end

    def flash_message_for_removed_user
      if @user == current_user
        flash[:notice] = "You left the #{@list.name.upcase} list successfully."
        redirect_to root_path
      else
        flash[:notice] = "#{@user.name.upcase} removed from the #{@list.name.upcase} list successfully."
        redirect_to edit_list_path(@list)
      end
    end

end
