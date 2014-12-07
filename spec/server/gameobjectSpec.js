/**
 * Created by Ben on 06/12/2014.
 */

describe("GameObject", function() {
    describe("GameObject constructor", function () {
        it("Creates a new GameObject", function () {
            var gameobject = new GameObject();

            expect(gameobject instanceof GameObject).toBeTruthy();
        });
    });
});