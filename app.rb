require 'sinatra'

configure :production do
  require 'newrelic_rpm'
end

class App < Sinatra::Application
end
