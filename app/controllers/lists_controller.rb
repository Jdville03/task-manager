class ListsController < ApplicationController
  before_action :require_logged_in

  def index
    @list = List.new
    @lists = current_user.lists
  end

end
