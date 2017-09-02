module ApplicationHelper

  def active_class(link_path, alt_link_path = nil, list_id = nil)
    "active" if current_page?(link_path) || current_page?(alt_link_path) || params[:list_id] == list_id.to_s
  end

end
