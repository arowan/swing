/**
 * Created by Ben on 03/12/2014.
 */

describe("Map constructor", function() {
    it("creates a correctly sized tiles array during construction", function () {
        var testWidth = 5;
        var testHeight = 5;

        var map = new Map(testWidth, testHeight);

        expect(map.tiles.length).toEqual(testWidth);

        map.tiles.forEach(function(element) {
            expect(element.length).toEqual(testHeight);
        })
    });

    it("creates an array where every element is a Tile object", function () {
        var testWidth = 5;
        var testHeight = 6;

        var map = new Map(testWidth, testHeight);

        map.tiles.forEach(function(element) {
            element.forEach(function(element) {
                expect(element instanceof Tile).toBeTruthy();
            })
        })
    })
});

describe("Map.width", function() {
    it("returns the width of the map", function () {
        var testWidth = 5;
        var testHeight = 6;

        var map = new Map(testWidth, testHeight);

        expect(map.width).toEqual(testWidth);
    })
})

describe("Map.height", function() {
    it("returns the height of the map", function () {
        var testWidth = 5;
        var testHeight = 6;

        var map = new Map(testWidth, testHeight);

        expect(map.height).toEqual(testHeight);
    })
})
