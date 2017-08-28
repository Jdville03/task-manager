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

end
