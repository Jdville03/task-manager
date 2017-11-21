class TasksController < ApplicationController
  before_action :require_logged_in

  def index
    display_sorted_lists
  end

# placeholder action for task json
  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.create(task_params)
    render json: @task, status: 201
  end

  def edit
    @list = List.find(params[:list_id])
    display_sorted_lists
    display_sorted_tasks(@list)
    @task = Task.find_by_id(params[:id])
    redirect_to list_path(@list) and return if @task.nil?
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes(task_params)
    if @task.list_id_changed?
      flash_message_and_redirect_for_moved_task
    else
      @task.save
      redirect_back(fallback_location: list_path(@task.list))
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "#{@task.description.upcase} task deleted from #{@task.list.name.upcase} list successfully."
    redirect_back(fallback_location: list_path(@task.list))
  end

  private

    def task_params
      params.require(:task).permit(:description, :status, :priority, :user_id, :due_date, :note, :list_id)
    end

    def flash_message_and_redirect_for_moved_task
      flash[:notice] = "#{@task.description.upcase} task moved from #{List.find(@task.list_id_was).name.upcase} list to #{@task.list.name.upcase} list successfully."
      @task.save
      update_assigned_user_association
      redirect_to edit_list_task_path(@task.list, @task)
    end

    def update_assigned_user_association
      if @task.assigned_user
        if !@task.list.shared_list? || !@task.list.users.include?(@task.assigned_user)
          @task.update(assigned_user: nil)
        end
      end
    end

end
