var Notifier = function() {};

Notifier.notify = function(message) {
  $("body").append(message);
};
