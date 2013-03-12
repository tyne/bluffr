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

  describe 'Get /session/join' do
    it 'allows a team member to join the session' do
      get '/session/join?id=somesession'

      last_response.should be_ok

      body = last_response.body
      body.should match /Welcome to the session/
      body.should match form_to '/session/accept'
      body.should match input_for 'id'
      body.should match input_for "name"
      body.should match 'Join'
    end
  end

  describe 'Get /session/accept' do
    it "informs team member that they have joined" do
      get '/session/accept?id=someid&name=Jonathan'

      last_response.should be_ok

      body = last_response.body
      body.should include "Jonathan has joined"
    end
  end
end
