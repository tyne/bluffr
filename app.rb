require 'sinatra'

get '/' do
  erb :spike
end

get '/bid' do
  erb :bid
end
