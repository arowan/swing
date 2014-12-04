describe("Character constructor", function() {
  it("instance of character", function () {
    var character = new Character();
    expect(character instanceof Character).toEqual(true);
  });

  it("allows object to assign attributes injects defaults", function () {
    var attributes = {foo: 'bar'}; 
    var character = new Character(attributes);
    
    expect(character.x).toEqual(0);
    expect(character.foo).toEqual('bar');
  });

  it("assigns attributes to this", function () {
    var attributes = {foo: true}; 
    var character = new Character(attributes);
    
    expect(character.foo).toEqual(true);
  });
});

describe("coordinates", function () {
  it ("returns x and y values", function (){
    var x = _.random(0, 100);
    var y = _.random(0, 100);

    var attributes = {x: x, y: y};
    var character = new Character(attributes);

    expect(character.coordinates()).toEqual([x,y]);
  });
});

describe("move", function () {
  it("increases x, y by values given", function (){
    var x = 10;
    var y = 30;
    var character = new Character();
    
    character.move(x, y);

    expect(character.coordinates()).toEqual([x, y]);
  })
});
