module DeviseHelper
  def devise_error_messages!
    return "" unless devise_error_messages?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t("errors.messages.not_saved",
                      :count => resource.errors.count,
                      :resource => resource.class.model_name.human.downcase)

    html = <<-HTML
    <div class="alert alert-danger alert-dismissable fade in" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <p>
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Error:</span>
        #{sentence}
      </p>
      <ul>#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

  def user_class(user)
    if user == current_user
      "primary"
    else
      "success"
    end
  end

  def user_initials(user)
    user.name.split(" ").collect{|name| name.first.upcase}.join("")
  end

  def user_initial(user)
    user.name.first.upcase
  end

  def user_incomplete_tasks_count(user)
    user.incomplete_tasks.count
  end

  def user_incomplete_starred_tasks(user)
    user.starred_tasks.incomplete.count
  end

  def user_incomplete_assigned_tasks(user)
    user.assigned_tasks.incomplete.count
  end

  def user_incomplete_overdue_tasks(user)
    user.overdue_tasks.incomplete.count
  end

  def user_incomplete_due_today_tasks(user)
    user.due_today_tasks.incomplete.count
  end

end
