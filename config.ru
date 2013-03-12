# config.ru
require 'faye'
require File.expand_path('../app', __FILE__)

Faye::WebSocket.load_adapter('thin')

use Faye::RackAdapter, :mount => '/faye', :timeout => 25

run App
