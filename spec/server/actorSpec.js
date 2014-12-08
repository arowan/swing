/**
 * Created by Ben on 06/12/2014.
 */

describe("Actor", function() {
    describe("Actor constructor", function () {
        it("Inherits from GameObject", function() {
            var actor = new Actor();

            expect(actor instanceof GameObject).toBeTruthy();
        });
        it("Can access the properties of the prototype (GameObject)", function() {
            var actor = new Actor();

            expect(actor.x).toEqual(0);
        })
    });
});