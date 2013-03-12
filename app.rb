require 'sinatra'
require './session_generator'

configure :production do
  require 'newrelic_rpm'
end

class App < Sinatra::Application
  get '/' do
    erb :index
  end

  get '/new' do
    session_id = SessionGenerator.generate

    redirect "/session?id=#{session_id}"
  end

  get '/session' do
    erb :session
  end
end
