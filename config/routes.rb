Rails.application.routes.draw do
  resources :tags
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'lists#index'
  resources :lists do
    resources :tasks
  end
  resources :tasks, only: [:index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
