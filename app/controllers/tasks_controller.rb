class TasksController < ApplicationController

  def show
    @list = List.find(params[:list_id])
    @lists = current_user.lists
    @task = Task.find(params[:id])
  end

end
