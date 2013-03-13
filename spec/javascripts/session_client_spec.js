describe("SessionClient", function() {
  var sessionClient, mockFaye;

  beforeEach(function() {
    mockFaye = {};
    mockFaye.subscribe = function() {};
    mockFaye.publish = function() {};
    spyOn(Faye, 'Client').andReturn(mockFaye);
    sessionClient = new SessionClient();
  });

  describe("joining a session", function() {
    it("notifies the channel", function() {
      spyOn(mockFaye, 'publish');

      sessionClient.join('somesessionid', 'Fred');

      expect(mockFaye.publish).toHaveBeenCalledWith('/somesessionid/join', {name: 'Fred'});
    });

    it("awaits the start of a round", function() {
      spyOn(mockFaye, 'subscribe');

      sessionClient.join('somesessionid', 'Fred');

      expect(mockFaye.subscribe).toHaveBeenCalledWith("/somesessionid/new_round", sessionClient.handleRound);
    });
  });

  describe("when a round is started", function() {
    it("notifies the user to give their estimate", function() {
      spyOn(Notifier, 'notify');

      sessionClient.handleRound();

      expect(Notifier.notify).toHaveBeenCalledWith("Give Your Estimate");
    });
  });
});
