describe("SessionManager", function() {
  var sessionManager, mockFaye;

  beforeEach(function() {
    sessionManager = new SessionManager();
    mockFaye = {};
    mockFaye.subscribe = function() {};
    mockFaye.publish = function() {};
    spyOn(Faye, 'Client').andReturn(mockFaye);
    spyOn(mockFaye, 'subscribe');
    sessionManager.start("somesessionid");
  });

  it("joins the channel for the session", function() {
    expect(mockFaye.subscribe).toHaveBeenCalledWith("/somesessionid/join", sessionManager.handleJoin);
    expect(mockFaye.subscribe).toHaveBeenCalledWith("/somesessionid/bid", sessionManager.handleBid);
  });

  describe("when a team member joins the session", function() {
    it("should show the team members name", function() {
      spyOn(Notifier, 'notify');
      sessionManager.handleJoin({ name: 'Tobias' });

      expect(Notifier.notify).toHaveBeenCalledWith('Tobias Joined Session');
    });
  });


  describe("starting a new round of estimates", function() {
    it("broadcasts a round event to the subscribers", function() {
      spyOn(mockFaye, 'publish');

      sessionManager.beginRound();

      expect(mockFaye.publish).toHaveBeenCalledWith("/somesessionid/new_round", {});
    });
  });
});
