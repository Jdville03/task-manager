class TasksController < ApplicationController
  before_action :require_logged_in

  def index
    display_sorted_lists
  end

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.create(task_params)
    redirect_back(fallback_location: list_path(@list))
  end

  def edit
    @list = List.find(params[:list_id])
    display_sorted_lists
    @task = Task.find_by_id(params[:id])
    redirect_to list_path(@list) if @task.nil?
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    redirect_back(fallback_location: list_path(@task.list))
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "#{@task.description.upcase} task deleted from #{@task.list.name.upcase} list successfully."
    redirect_back(fallback_location: list_path(@task.list))
  end

  private

    def task_params
      params.require(:task).permit(:description, :status, :priority, :assigned_user_id, :due_date, :note)
    end

end
