Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, default: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :projects, only: [:index, :create, :show, :destroy, :edit]
    resources :categories, only: [:index]
  end
end
