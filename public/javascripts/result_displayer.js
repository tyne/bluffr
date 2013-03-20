var ResultDisplayer = function() {};

ResultDisplayer.display = function(results) {
  var names = Object.keys(results);
  $(names).each(function(index, name) {
    var bid = results[name];
    $("body").append(name + " bid " + bid);
  });
};
