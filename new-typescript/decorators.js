"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//habilitar en tsconfig.json
// "target": "es6",  
//  "experimentalDecorators": true,   
//los decorators son funciones!!
//se acostumbra nombrarlas empezando con mayusculas
//El decorator se ejecuta en la fase en que TS registra la clase que es decorada
//NO es necesario que se cree una instancia de la clase para que se ejecute el decorator!!
//Un decorator que actua sobre una clase recibe como argumento al constructor
function Logger(target) {
    console.log("Logging...");
    console.log(target);
}
//Esta funcion es una factory de decorator
//devuelve una funcion decorator. la ventaja es que la funcion factory
//puede recibir los parametros extra que necesite pasarle a mi decorator
function LoggerFactory(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
//creamos un decorator mas caña. este puede renderizar algo en un nodo del DOM
function WithTemplate(template, hookId) {
    return function (constructor) {
        const hookEl = document.getElementById('app');
        //esto es lo bacan del decorator
        //al acceder al constructor podemos instanciar la clase y acceder a sus atributos y metodos
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            //aca asumo que el template contiene un parrafo p.
            //y como TS se queja porque podría no existir dicho p , utilizamos el "!" para asegurar
            //que el p existirá
            hookEl.querySelector('p').textContent = p.name;
        }
    };
}
//Cuando hay varios decorators aplicados a un elemento, las funciones decorators como tal se ejecutaran
//de arriba hacia abajo, desde las mas cercana a la clase hasta la mas lejana
//OJO: las funciones factory Sí se ejecutan de arriba hacia abajo ya que al final se comportan como
//meras funciones de JS
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log("Creating Person Object");
    }
    getName() {
        return this.name;
    }
};
Person = __decorate([
    Logger,
    LoggerFactory('LOGGIN - PERSON'),
    WithTemplate('<h2>Hola Template! <p></p></h2>', 'app')
], Person);
const person = new Person();
//console.log(person);
//Decorator aplicado a un atributo
//recibe dos argumentos: proptotype del atributo y el nombre o simbolo del atributo
//El Decorator se ejecuta cuando se define el atributo en tiempo de carga de clases!!
function Log(target, propertyName) {
    console.log("Property Decorator!!");
    console.log(target, propertyName);
}
//decorator para metodos de acceso (getter o setter) o metodos normales
//Si el metodo es de instancia target devuelve el prototype de la clase
//Si el metodo es estatico target devuelve el constructor
function Log2(target, name, descriptor) {
    console.log("Method or Accesor Decorator!!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//Decorator de parametros
//target devuelve lo mismo que el decorator de metodos
//name es el nombre del metodo que contiene el parametro como argumento, NO el nombre del parametro
//position es el numero de orden que tiene el parametro en la lista de argumentos (empezando desde 0)
function Log3(target, name, position) {
    console.log("Params Decorator!!");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price!!.');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (tax + 1);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log2,
    __param(0, Log3)
], Product.prototype, "getPriceWithTax", null);
