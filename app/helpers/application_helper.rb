module ApplicationHelper

  def active_class(link_path)
    "active" if current_page?(link_path)
  end

  def button_class(flash)
    if flash[:alert]
      "danger"
    else
      "default"
    end
  end

end
