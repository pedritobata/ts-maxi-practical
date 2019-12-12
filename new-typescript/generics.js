"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Some built-in generic types
var names = [];
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
var merged = merge({ name: "Tato" }, { age: 44 });
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
var merged2 = merge2({ name: "Perico" }, { age: 40 });
//esta funcion devolverá una tupla
function countAndDescribe(element) {
    var description = "Got no value.";
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
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.data = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.data.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    };
    DataStorage.prototype.getData = function () {
        // devolvemos una copia del array para que no se pueda modificar de afuera
        return __spreadArrays(this.data);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addItem("Perico");
textStorage.addItem("Fernandillo");
textStorage.addItem("Rapha");
textStorage.removeItem("Rapha");
console.log(textStorage.getData());
