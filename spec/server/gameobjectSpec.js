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

describe("setCoordinates", function () {
    it ("assign x and y coordinates in one go", function (){
        var x = 990;
        var y = 15;

        var gameObj = new GameObject();
        gameObj.setCoordinates(x,y);

        expect(gameObj.x).toEqual(x);
        expect(gameObj.y).toEqual(y);
    });
});


describe("coordinates", function () {
    it ("returns x and y values", function (){
        var x = 163;
        var y = 511;

        var gameObj = new GameObject();
        gameObj.setCoordinates(x, y);

        expect(gameObj.coordinates()).toEqual([x,y]);
    });
});
