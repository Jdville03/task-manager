class TasksController < ApplicationController

  def index
    @list = List.find(params[:list_id])
    redirect_to list_path(@list)
  end

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.create(task_params)
    redirect_back(fallback_location: list_path(@list))
  end

  def edit
    @list = List.find(params[:list_id])
    @lists = current_user.lists
    @task = Task.find(params[:id])
    if @list.display_all_tasks?
      @tasks = @list.tasks
    else
      @tasks = @list.tasks.incomplete
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    redirect_back(fallback_location: list_path(@task.list))
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "#{@task.description.capitalize} task deleted successfully."
    redirect_to list_path(@task.list)
  end

  private

    def task_params
      params.require(:task).permit(:description, :status, :priority, :assigned_user_id, :due_date, :note)
    end

end
