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
  });
});
