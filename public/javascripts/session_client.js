var SessionClient = function() {};

SessionClient.prototype.join = function(sessionId, memberName) {
  var _this = this;
  _this.sessionId = sessionId;
  _this.memberName = memberName;
  _this.client = new Faye.Client('/faye');

  _this.client.publish(_this.channel('join'), {name: _this.memberName});
  _this.client.subscribe(_this.channel('new_round'), _this.handleRound);
};

SessionClient.prototype.channel = function(name) {
  return "/" + this.sessionId + "/" + name;
}

SessionClient.prototype.handleRound = function() {
  Notifier.notify("Give Your Estimate");
}

