/**
 * Created by Al on 10/12/2014.
 */
describe("Store", function() {
    describe("Store constructor", function () {
        it("Creates Manager Object", function() {
            var store = new Store();
            expect(store instanceof Store).toBe(true);
        });

        it("has an array inventory", function () {
            var store = new Store();
            expect(store.inventory instanceof Array).toBe(true);
        });

        it("inventory can be initialized with array", function () {
            var array = [{foo: 'bar'}];
            var store = new Store(array);
            expect(store.inventory).toEqual(array);
        });
    });

    describe("AddObject", function() {
        it("Adds object to inventory returns index", function (){
            var store = new Store();
            var jsonObject = {id: 123};
            expect(store.addObject(jsonObject)).toEqual(0);
            expect(store.inventory).toEqual([jsonObject]);
        });
    });

    describe("RemoveObject / RemoveIndex", function () {
        it("Removes an object from inventory by object",function () {
            var obj1 = {foo: 'bar'};
            var obj2 = {foo2: 'bar2'};

            var store = new Store([obj1, obj2]);
            store.removeObject(obj2);
            expect(store.inventory).toEqual([obj1]);
        });

        it("Removes and object by index by index", function () {
            var obj1 = {foo: 'bar'};
            var obj2 = {foo2: 'bar2'};

            var store = new Store([obj1, obj2]);
            store.removeIndex(0);
            expect(store.inventory).toEqual([obj2]);
        });
    });

    describe("GetObject", function () {
        it("Returns object at index given", function (){
            var obj1 = {foo: 'bar'};
            var obj2 = {foo2: 'bar2'};

            var store = new Store([obj1, obj2]);
            expect(store.getObject(1)).toEqual(obj2);
        });
    });

    describe("FindObject", function () {
        it("Returns unique object from key, value", function () {
            var obj1 = {foo: 'bar'};
            var obj2 = {foo2: 'bar2'};

            var store = new Store([obj1, obj2]);
            expect(store.findObject('foo', 'bar')).toEqual(obj1);
        })
    });

    describe("FindIndex", function () {
        it("Returns index from key, value", function () {
            var obj1 = {foo: 'bar'};
            var obj2 = {foo2: 'bar2'};

            var store = new Store([obj1, obj2]);
            expect(store.findIndex('foo2', 'bar2')).toEqual(1);
        })
    })

    describe("FindMatching", function () {
        it("Returns all matching from key, value", function () {
            var obj1 = {foo: 'bar', name: 'sarah'};
            var obj2 = {foo2: 'bar2', name: 'gavin'};
            var obj3 = {foo: 'bar', name: 'bob'};
            var obj4 = {foo2: 'bar2', name: 'terry'};

            var store = new Store([obj1, obj2, obj3, obj4]);
            expect(store.findMatching('foo2', 'bar2')).toEqual([obj2, obj4]);
        })
    })
});