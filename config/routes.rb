Rails.application.routes.draw do
  root controller: :posts, action: :index

  resources :posts, only: %i[index create]
end
