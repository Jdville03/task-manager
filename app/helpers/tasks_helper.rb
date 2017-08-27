module TasksHelper

  def form_for_task_status(task)
    form_for([task.list, task]) do |f|
      f.check_box :status, :class => "toggle", :checked => task.complete?
    end
  end

  def li_class_for_task(task)
    "completed" if task.complete?
  end

end
