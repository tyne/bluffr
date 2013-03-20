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
    var joinFunc = mockFaye.subscribe.argsForCall[0][1];
    var bidFunc = mockFaye.subscribe.argsForCall[1][1];
    expect(mockFaye.subscribe).toHaveBeenCalledWith("/somesessionid/join", joinFunc);
    expect(mockFaye.subscribe).toHaveBeenCalledWith("/somesessionid/bid", bidFunc);
  });

  describe("when a team member joins the session", function() {
    it("should show the team members name", function() {
      spyOn(Notifier, 'notify');
      sessionManager.handleJoin({ name: 'Tobias' });

      expect(Notifier.notify).toHaveBeenCalledWith('Tobias Joined Session');
    });

    it("records unique participants", function() {
      spyOn(Notifier, 'notify');

      sessionManager.handleJoin({ name: 'Tobias' });
      sessionManager.handleJoin({ name: 'Tobias' });

      expect(sessionManager.participants).toEqual(['Tobias']);
    });
  });


  describe("starting a new round of estimates", function() {
    beforeEach(function() {
      spyOn(mockFaye, 'publish');

      sessionManager.beginRound();
    });

    it("broadcasts a round event to the subscribers", function() {
      expect(mockFaye.publish).toHaveBeenCalledWith("/somesessionid/new_round", {});
    });

    it("resets received estimates", function() {
      expect(sessionManager.currentEstimates).toEqual({});
    });
  });

  describe("receiving an estimate", function() {
    beforeEach(function() {
      sessionManager.handleBid({name: 'Joe Bloggs', bid: '123'});
    });

    it("stores the estimate in the currentEstimates list", function() {
      expect(sessionManager.currentEstimates).toEqual({'Joe Bloggs': '123'});
    });

    describe("when all bids have been received", function() {
      beforeEach(function() {
        spyOn(Notifier, 'notify');
        sessionManager.handleJoin({ name: 'Rodd' });
        sessionManager.handleJoin({ name: 'Jane' });
        sessionManager.handleJoin({ name: 'Freddy' });
        spyOn(sessionManager, 'closeRound');
      });

      it("automatically closes the round of estimates", function() {
        sessionManager.beginRound();
        sessionManager.handleBid({name: 'Jane', bid: '10'});
        sessionManager.handleBid({name: 'Rodd', bid: '11'});
        expect(sessionManager.closeRound).wasNotCalled();

        sessionManager.handleBid({name: 'Freddy', bid: '8'});
        expect(sessionManager.closeRound).toHaveBeenCalled();
      });
    });
  });

  describe("when a round of estimates is closed", function() {
    beforeEach(function() {
      spyOn(ResultDisplayer, 'display');

      sessionManager.beginRound();
      sessionManager.handleBid({name: 'Jane', bid: '10'});
      sessionManager.handleBid({name: 'Rodd', bid: '11'});
      sessionManager.closeRound();
    });

    it("displays the results", function() {
      expect(ResultDisplayer.display).toHaveBeenCalledWith({'Jane': '10', 'Rodd': '11'});
    });
  });
});
