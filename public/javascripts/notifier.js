var Notifier = function() {};

Notifier.notify = function(message) {
  $.jGrowl(message);
};
