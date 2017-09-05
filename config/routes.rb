Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'lists#index'
  resources :lists do
    resources :tasks
  end
  resources :tasks, only: [:index]

  get '/tasks/starred' => 'tasks#index', as: 'starred_tasks'
  get '/tasks/assigned_to_me' => 'tasks#index', as: 'my_assigned_tasks'
  get '/tasks/overdue' => 'tasks#index', as: 'overdue_tasks'
  get '/tasks/due_today' => 'tasks#index', as: 'due_today_tasks'

  # resources :tags

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
