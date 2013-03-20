describe("Result Displayer", function() {
  var results = {
    "Tobias": '123',
    "Jonathan": '456'
  };

  it("displays a message", function() {
    ResultDisplayer.display(results);

    expect($("body").html()).toMatch(/Tobias.*123/);
    expect($("body").html()).toMatch(/Jonathan.*456/);
  });
});
