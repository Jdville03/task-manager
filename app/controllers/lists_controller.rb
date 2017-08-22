class ListsController < ApplicationController
  before_action :require_logged_in

  def index
    @list = List.new
    @lists = current_user.lists
  end

  def show
    @list = List.find(params[:id])

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

  private

    def list_params
      params.require(:list).permit(:name)
    end

end
