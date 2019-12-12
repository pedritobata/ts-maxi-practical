"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
function moveAnimal(animal) {
    var speed;
    if (animal.type === 'bird') {
        speed = animal.flyingSpeed;
    }
    else {
        speed = animal.runningSpeed;
    }
    console.log('Running at speed...' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 120 });
////CASTING
//const inputElement = <HTMLInputElement>document.getElementById('user-input')!;
var inputElement = document.getElementById('user-input');
console.log(inputElement);
inputElement.value = 'Hi there!!';
var errorBag = {
    email: 'Invalid email',
    userName: 'Must star with Capital character.'
};
function addition(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + ' ' + b.toString();
    }
    return a + b;
}
var comoString = addition('Pedro', 'Martinez');
//como  los dos argumentos son string y coinciden con uno de los overloads, entonces
//el resultado es string segun ese overload, por lo tanto podria aplicar un metodo de string al resultado
console.log(comoString.split(' '));
//OPTIONAL CHAINING
//suponemos que esta data llega desde un backend
var fetchedUserData = {
    id: 'u1',
    name: 'Perico',
    job: { title: 'CEO', description: "My Company" }
};
//con este truco evitamos que se caiga el programa al querer acceder a un dato que
//posiblemente no llegue del backend
console.log(fetchedUserData.job && fetchedUserData.job.title);
//puedo obtener la misma validacion usando chaining
console.log((_b = (_a = fetchedUserData) === null || _a === void 0 ? void 0 : _a.job) === null || _b === void 0 ? void 0 : _b.title);
//NULLISH COALESCING
//el operador "??" sirve para validar si un valor es null o undefined , SOLO CUALQUIERA DE ESOS DOS
var userInput = '';
//si userInput fuera null o undefined, el resultado sería DEFAULT
var storeData = (userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT');
console.log(storeData);
