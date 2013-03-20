var SessionManager = function() {};

SessionManager.prototype.start = function(sessionId) {
  var _this = this;
  _this.sessionId = sessionId;

  _this.client = new Faye.Client('/faye');
  _this.participants = [];
  _this.currentEstimates = {};
  _this.client.subscribe(_this.channel('join'), function(data) {
    _this.handleJoin(data);
  });

  _this.client.subscribe(_this.channel('bid'), function(data) {
    _this.handleBid(data);
  });
};

SessionManager.prototype.channel = function(name) {
  return "/" + this.sessionId + "/" + name;
}

SessionManager.prototype.handleJoin = function(message) {
  var _this = this;
  var messageText = message.name + " Joined Session";
  if (_this.participants.indexOf(message.name) < 0) {
    _this.participants.push(message.name);
  }

  Notifier.notify(messageText);
};

SessionManager.prototype.beginRound = function() {
  var _this = this;
  _this.client.publish(_this.channel('new_round'), {});
  _this.currentEstimates = {};
};

SessionManager.prototype.handleBid = function(bid) {
  var _this = this;
  var name = bid.name;
  var estimate = bid.bid;

  _this.currentEstimates[name] = estimate;
  if (Object.keys(_this.currentEstimates).length == _this.participants.length) {
    _this.closeRound();
  }
};

SessionManager.prototype.closeRound = function() {
  var _this = this;
  ResultDisplayer.display(_this.currentEstimates);
};
