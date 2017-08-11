class ListsController < ApplicationController
  before_action :require_logged_in

  def index
    @list = List.new
    @lists = current_user.lists
  end

  def show
    @list = List.find(params[:id])
  end

  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to list_path(@list)
    else
      @lists = List.all
      render :index
    end
  end

  private

    def list_params
      params.require(:list).permit(:name)
    end

end
