"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    //los parametros tambien pueden ser opcionales
    function Person(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + ' ' + this.name);
    };
    return Person;
}());
var user1;
user1 = new Person();
user1.greet('Hello there');
var addFn1;
addFn1 = function (n1, n2) {
    return n1 + n2;
};
var addFn2;
addFn2 = function (a, b) {
    return a + b;
};
var e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
//let uni1: Universal = true;  esto da error
var unit2 = 23;
//Type Guards
//usando los tipos creados antes
function add(n1, n2) {
    //esto es un Guard, es decir, un check de tipos para evitar errores
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
function printEmployeeInformation(emp) {
    console.log(emp.name);
    if ('privileges' in emp) { //este es otro Guard o check de tipo
        console.log(emp.privileges);
    }
}
printEmployeeInformation(e1);
//con objetos y union types
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('Driving a Car...');
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('Driving a Truck...');
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log('Loading cargo...' + amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(10000);
    }
}
useVehicle(v1);
useVehicle(v2);
