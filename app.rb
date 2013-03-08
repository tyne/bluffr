require 'sinatra'

configure :production do
  require 'newrelic_rpm'
end

get '/' do
  erb :spike
end

get '/bid' do
  erb :bid
end
