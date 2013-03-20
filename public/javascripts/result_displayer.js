var ResultDisplayer = function() {};

ResultDisplayer.display = function(results) {
  var mapped_results = [];
  var names = Object.keys(results);
  $(names).each(function(k, name) {
    mapped_results.push({'name': name, 'bid':results[name]});
  });
  var source = $("#results-template").html();
  console.log(source);
  var template = Handlebars.compile(source);

  var html = template({'results': mapped_results});
  $("body #dynamic").html(html);
};
