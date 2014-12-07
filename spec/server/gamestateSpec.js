/**
 * Created by Ben on 06/12/2014.
 */

describe("GameState", function() {
    describe("Gamestate constructor", function () {
        it("creates a new gamestate", function () {
            var gamestate = new GameState();

            expect(gamestate instanceof GameState).toBeTruthy();
        });
    });
    describe("addUser", function () {
        it("Adds a new user to the users array", function () {
            var gamestate = new GameState();
            gamestate.addUser();
            expect(gamestate.users[0] instanceof User).toBeTruthy();
        });
        it("Returns the newly created user object", function () {
            var gamestate = new GameState();
            var result = gamestate.addUser();
            expect(result instanceof User).toBeTruthy();

        });
    });
    describe("removeUser", function () {
        it("Removes a user from the users array", function () {
            var gamestate = new GameState();

            var testInputUser1 = new User();
            testInputUser1.id = "1"; // Just assigning some data to differentiate the two User objects
            gamestate.users.push(testInputUser1);

            var testInputUser2 = new User();
            testInputUser2.id = "2"; // Just assigning some data to differentiate the two User objects
            gamestate.users.push(testInputUser2);

            gamestate.removeUser(testInputUser1);
            expect(gamestate.users[0]).toEqual(testInputUser2);
        })
    });
    describe("allPlayers", function () {
        it("Returns an array of player objects for all connected users", function () {
            var gamestate = new GameState();
            var user1 = gamestate.addUser();
            var user2 = gamestate.addUser();

            var allPlayers = gamestate.allPlayers();

            expect(allPlayers).toContain(user1.player);
            expect(allPlayers).toContain(user2.player);
        });
    });
});