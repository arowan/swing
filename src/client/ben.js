/**
 * Created by Ben on 03/12/2014.
 */

function helloWorld() {
    return "Hello world!";
}

function anotherFunction() {


}

var Person = function() {};

Person.prototype.helloSomeone = function(toGreet) {
    return this.sayHello() + " " + toGreet;
};

Person.prototype.sayHello = function() {
    return "Hello";
};