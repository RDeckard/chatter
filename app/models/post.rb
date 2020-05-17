# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  validates :body, length: { minimum: 1, maximum: 200 }
end
