module TasksHelper

  def form_for_task_status(task)
    form_for([task.list, task]) do |f|
      f.check_box :status, :class => "toggle-status", :checked => task.complete?
    end
  end

  def li_class_for_task(task)
    if task.complete? && current_page?(edit_list_task_path(task.list, task))
      "completed selected"
    elsif task.complete?
      "completed"
    elsif current_page?(edit_list_task_path(task.list, task))
      "selected"
    end
  end

  def form_for_task_priority(task)
    form_for([task.list, task]) do |f|
      f.check_box :priority, :class => "toggle-priority", :checked => task.starred?
    end
  end

  def calendar_icon_class(task)
    if Time.zone.today > task.due_date
      "fa fa-calendar-times-o fa-fw text-danger"
    elsif Time.zone.today == task.due_date
      "fa fa-calendar-check-o fa-fw text-warning"
    else
      "fa fa-calendar-o fa-fw"
    end
  end

  def calendar_tooltip(task)
    if (Time.zone.today > task.due_date) && task.incomplete?
      "Overdue #{task.due_date.strftime('%m/%d/%Y')}"
    elsif Time.zone.today == task.due_date
      "Due today"
    elsif Time.zone.tomorrow == task.due_date
      "Due tomorrow"
    else
      "Due on #{task.due_date.strftime('%m/%d/%Y')}"
    end
  end

end
