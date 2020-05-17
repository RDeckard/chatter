# frozen_string_literal: true

class AddUserReferenceToPosts < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :username, :string, default: 'chatter', null: false
    add_reference :posts, :user,     foreign_key: true
  end
end
