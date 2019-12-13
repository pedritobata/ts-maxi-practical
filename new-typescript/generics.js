"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Some built-in generic types
const names = [];
names.push('Perico');
//No está funcando con Promises
// const promise: Promise<string> = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('This Promise resolves to a String.');
//     }, 2000);
// });
//Custom Generic function
//Ts infiere que esta funcion retorna : T & U, la interseccion debido a que
//la funcion retorna un Object.assign
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const merged = merge({ name: "Tato" }, { age: 44 });
//el objeto merged es el resultante de la funcion generica, en este caso
//es del tipo interseccion:  {name: string} & {age: number} 
console.log(merged.age);
//generics con constraints:
function merge2(objA, objB) {
    //para que funcione Object.assign hemos configurado en tsconfig.json:
    //"lib": ["es2015", "es2017", "dom"]
    return Object.assign(objA, objB);
}
//esto no funca porque 30 No es object
// const merged2 = merge2({name:"Perico"}, 30);
const merged2 = merge2({ name: "Perico" }, { age: 40 });
//esta funcion devolverá una tupla
function countAndDescribe(element) {
    let description = "Got no value.";
    if (element.length === 1) {
        description = "Got 1 element.";
    }
    else if (element.length > 1) {
        description = "Got " + element.length + " elements.";
    }
    return [element, description];
}
console.log(countAndDescribe("Esa es buena"));
//Asegurarse que un elemento sea key de un Objeto usando keyof
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
console.log(extractAndConvert({ name: "Pedro" }, "name"));
//Generic classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getData() {
        // devolvemos una copia del array para que no se pueda modificar de afuera
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Perico");
textStorage.addItem("Fernandillo");
textStorage.addItem("Rapha");
textStorage.removeItem("Rapha");
console.log(textStorage.getData());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
//Readonly , otro generic utilitario
//sirve para volver un objeto como inmutable, solo de lectura
const namesArray = ['Pedro', 'Martinez'];
//namesArray.push('Fer'); esto falla
// IMPORTANTE  Generics vs Union Types
//Generics solo admiten UN tipo de dato para toda una determinada clase o funcion
//Union types admiten varios tipos de dato para una determinada clase o funcion
