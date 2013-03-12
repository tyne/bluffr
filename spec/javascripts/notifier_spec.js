describe("Notifier", function() {
  it("displays a message", function() {
    Notifier.notify("Foo");

    expect($("body").html()).toMatch("Foo");
  });
});
