describe("Player constructor", function() {
  it("instance of Player", function () {
    var player = new Player();
    expect(player instanceof Player).toEqual(true);
  });

  it("extends character", function () {
    var attributes = {foo: 'bar'}; 
    var player = new Player(attributes);
    
    expect(player.foo).toEqual('bar');
    expect(player.coordinates()).toEqual([0,0])
  });
});

describe("left", function() {
  it("", function () {
  });
});

