/**
* Created by Ben on 06/12/2014.
*/
var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

var GameObject = require("../../src/shared/gameobject.js");
var expect = require("expect.js");

describe("GameObject", function() {
    describe("GameObject constructor", function () {
        it("Creates a new GameObject", function () {
            var gameobject = new GameObject();

            expect(gameobject instanceof GameObject).to.be.ok();
        });
    });
});

describe("setCoordinates", function () {
    it ("assign x and y coordinates in one go", function (){
        var x = 990;
        var y = 15;

        var gameObj = new GameObject();
        gameObj.setCoordinates(x,y);

        expect(gameObj.x).to.be(x);
        expect(gameObj.y).to.be(y);
    });
});


describe("coordinates", function () {
    it ("returns x and y values", function (){
        var x = 163;
        var y = 511;

        var gameObj = new GameObject();
        gameObj.setCoordinates(x, y);

        expect(gameObj.coordinates()).to.eql([x,y]);
    });
});