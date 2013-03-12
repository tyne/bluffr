require 'spec_helper'

describe App do
  let(:app) { described_class.new }

  describe 'GET /' do
    it "renders the welcome page" do
      get '/'

      last_response.should be_ok
      last_response.body.should match /Welcome to bluffr/
    end

    it "allows the scrum master to start a new session" do
      get '/'

      last_response.body.should match link_to '/new'
    end
  end

  describe 'Get /new' do
    it 'starts a new session' do
      SessionGenerator.stub(:generate).and_return('somesessionid')
      get '/new'

      last_response.should be_redirect
      last_response.location.should match /session\?id=somesessionid/
    end
  end

  describe 'Get /session' do
    it 'renders the session host page' do
      get '/session?id=somesession'

      last_response.should be_ok
      body = last_response.body
      body.should match /\/faye\/client\.js/
      body.should match /\/js\/session_manager\.js/
    end

    it 'allows scrum master to invite team members' do
      get '/session?id=somesession'

      body = last_response.body
      body.should include 'mailto:?subject=Join%20Our%20Planning%20Session&body=http://example.org/session/join?id=somesession'
    end
  end
end
