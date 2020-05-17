# frozen_string_literal: true

Rails.application.routes.draw do
  root controller: :posts, action: :index

  resources :posts, only: %i[index create]

  namespace :admin do
    resources :posts

    root controller: :posts, action: :index
  end
end
