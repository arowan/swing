// Example of a client test

describe("Manager", function() {
    describe("Manager constructor", function () {
        it("Creates Manager Object", function() {
            var manager = new Manager();
            expect(manager instanceof Manager).toBe(true);
        });
    });
});
