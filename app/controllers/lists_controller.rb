class ListsController < ApplicationController
  before_action :require_logged_in

  def index
    @list = List.new
    @lists = current_user.lists
  end

  def show
    @list = List.find(params[:id])
    @lists = current_user.lists
    @task = Task.new
  end

  def create
    @list = List.new(list_params)
    if @list.save
      current_user.user_lists.create(list: @list, permission: "owner")
      redirect_to list_path(@list)
    else
      @lists = current_user.lists
      render :index
    end
  end

  def edit
    @list = List.find(params[:id])
    @lists = current_user.lists
    @task = Task.new
  end

  def update
    @list = List.find(params[:id])
    @list.update(list_params)
    #raise list_params.inspect
    if @list.save
      error_message_for_sharing_list(list_params)
      redirect_to edit_list_path(@list)
    else
      @lists = current_user.lists
      @task = Task.new
      render :edit
    end
  end

  def destroy
    @list = List.find(params[:id])
    if params[:user_id]
      user = User.find(params[:user_id])
      @list.users.delete(user)
      if tasks = @list.tasks.assigned_to_user(user)
        tasks.each do |task|
          task.update(assigned_user: nil)
        end
      end
      if user == current_user
        flash[:notice] = "You left the #{@list.name} list successfully."
        redirect_to root_path
      else
        redirect_to edit_list_path(@list)
      end
    else
      @list.destroy
      flash[:notice] = "#{@list.name} list deleted successfully."
      redirect_to root_path
    end
  end

  private

    def list_params
      params.require(:list).permit(:name, users_attributes: [:email])
    end

    def error_message_for_sharing_list(list_params)
      email = list_params.dig(:users_attributes, "0", :email)
      if email.present? && !User.all.include?(User.find_by(email: email))
        flash[:alert] = "There is no user associated with #{email}."
      end
    end

end
