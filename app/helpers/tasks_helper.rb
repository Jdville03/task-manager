module TasksHelper

  def form_for_task_status(task)
    form_for([task.list, task]) do |f|
      f.check_box :status, :class => "toggle-status", :checked => task.complete?
    end
  end

  def li_class_for_task(task)
    "completed" if task.complete?
  end

  def form_for_task_priority(task)
    form_for([task.list, task]) do |f|
      f.check_box :priority, :class => "toggle-priority", :checked => task.starred?
    end
  end

  def calendar_icon_class(task)
    if Date.today > task.due_date
      "fa fa-calendar-times-o fa-fw text-danger"
    elsif Date.today == task.due_date
      "fa fa-calendar-check-o fa-fw text-warning"
    else
      "fa fa-calendar-o fa-fw text-success"
    end
  end

  def calendar_tooltip(task)
    if Date.today > task.due_date
      "Past due #{task.due_date}"
    elsif Date.today == task.due_date
      "Due today"
    elsif Date.tomorrow == task.due_date
      "Due tomorrow"
    else
      "Due #{task.due_date}"
    end
  end

end
