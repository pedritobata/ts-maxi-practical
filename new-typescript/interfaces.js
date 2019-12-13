"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    //los parametros tambien pueden ser opcionales
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = new Person();
user1.greet('Hello there');
let addFn1;
addFn1 = (n1, n2) => {
    return n1 + n2;
};
let addFn2;
addFn2 = (a, b) => {
    return a + b;
};
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
//let uni1: Universal = true;  esto da error
let unit2 = 23;
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
class Car {
    drive() {
        console.log('Driving a Car...');
    }
}
class Truck {
    drive() {
        console.log('Driving a Truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(10000);
    }
}
useVehicle(v1);
useVehicle(v2);
