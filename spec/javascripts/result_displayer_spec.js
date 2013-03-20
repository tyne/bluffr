describe("Result Displayer", function() {
  var results = {
    "Tobias": '123',
    "Jonathan": '456'
  };

  beforeEach(function() {

  $("body").append("<script id='results-template' type='text/x-handlebars-template'>
<ul id='results'>
{{#each results}}
  <li>
    <span class='estimate'>{{this.bid}}</span>
    <span class='name'>{{this.name}}</span>
  </li>
{{/each}}
</ul>
</script>");
  });

  it("displays a message", function() {
    ResultDisplayer.display(results);

    expect($("body").html()).toMatch(/Tobias.*123/);
    expect($("body").html()).toMatch(/Jonathan.*456/);
  });
});
