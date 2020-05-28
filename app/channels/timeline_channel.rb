# frozen_string_literal: true

class TimelineChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'timeline'
  end

  def receive(data)
    puts data
  end

  def game_over(data)
    puts data
  end
end
