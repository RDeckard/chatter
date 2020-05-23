# frozen_string_literal: true

Rails.application.routes.draw do
  root controller: :posts, action: :index

  devise_for :users
  resources :posts, only: %i[index create]

  namespace :admin do
    resources :users
    resources :posts

    root controller: :posts, action: :index
  end

  get :game, controller: :application, action: :game
end
