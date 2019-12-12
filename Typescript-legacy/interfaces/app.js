"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(person) {
    console.log('Hello,', person.firstName);
}
function changeName(person, newName) {
    person.firstName = newName;
    greet(person);
}
var person = {
    firstName: 'Perico',
    age: 44
};
greet(person);
changeName(person, 'Tato');
