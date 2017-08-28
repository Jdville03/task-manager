class TasksController < ApplicationController

  def index
    @list = List.find(params[:list_id])
    redirect_to list_path(@list)
  end

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.build(task_params)
    if @task.save
      redirect_to list_path(@list)
    else
      @lists = current_user.lists
      render "lists/show"
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    redirect_to list_path(@task.list)
  end

  def show
    @list = List.find(params[:list_id])
    @lists = current_user.lists
    @task = Task.find(params[:id])
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to list_path(@task.list)
  end

  private

    def task_params
      params.require(:task).permit(:description, :status, :priority)
    end

end
