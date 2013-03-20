describe("Notifier", function() {
  it("displays a message", function() {
    spyOn($, 'jGrowl');
    Notifier.notify("Foo");

    expect($.jGrowl).toHaveBeenCalledWith("Foo");
  });
});
