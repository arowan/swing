/**
 * Created by Al on 10/12/2014.
 */
describe("ActorManager", function() {
    describe("ActorManager constructor", function () {
        it("Creates Manager Object", function() {
          var am = new ActorManager();
          expect(am instanceof ActorManager).toBe(true);
        });

        it("has Store object as actors", function () {
          var am = new ActorManager();
          expect(am.actors instanceof Store).toBe(true);
        });
    });

    describe("add", function () {
      it("adds a actor to the store", function () {
        var am = new ActorManager();
        var actor = new Actor();
        am.add(actor);

        expect(am.actors.inventory).toEqual([actor]);
      });
    });
});
