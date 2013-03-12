var SessionManager = function() {};

SessionManager.prototype.start = function(sessionId) {
  var _this = this;
  _this.sessionId = sessionId;

  _this.client = new Faye.Client('/faye');
  _this.client.subscribe(_this.channel('join'), _this.handleJoin);
  _this.client.subscribe(_this.channel('bid'), _this.handleBid);
};

SessionManager.prototype.channel = function(name) {
  return "/" + this.sessionId + "/" + name;
}

SessionManager.prototype.handleJoin = function(message) {
  var message = message.name + " Joined Session";
  Notifier.notify(message);
};

SessionManager.prototype.beginRound = function() {
  var _this = this;
  _this.client.publish(_this.channel('new_round'), {});
};
