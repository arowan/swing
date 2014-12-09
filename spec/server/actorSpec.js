/**
 * Created by Ben on 06/12/2014.
 */
var GameObject = require("../../src/server/gameObject.js");
var Actor = require("../../src/server/actor.js");
var expect = require("expect.js");

describe("Actor", function() {
    describe("Actor constructor", function () {
        it("Inherits from GameObject", function() {
            var actor = new Actor();

            expect(actor instanceof GameObject).to.be.ok();
        });
        it("Can access the properties of the prototype (GameObject)", function() {
            var actor = new Actor();

            expect(actor.x).to.eql(0);
        })
    });
});