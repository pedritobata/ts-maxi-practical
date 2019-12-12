export {} ;


//readonly es el unico modificador de acceso que pueden tener las interfaces
//Las interfaces se definen casi igual que los type
interface Named {//al agregar el signo ? estamos estableciendo el elemento como opcional
    readonly name?: string;
    outputName?: string;

    //los metodos tambien se pueden marcar como opcionales
    printName?() : void;
}

//las interfaces pueden extender una o mas interfaces
//a diferencia de las clases que solo pueden extender de UNA clase y pueden implementar una o mas interfaces
interface Greetable extends Named{
    greet(phrase: string): void;
}

class Person implements Greetable{
    name?: string;
    age = 30;

    //los parametros tambien pueden ser opcionales
    constructor(n?: string){
        if(n){
            this.name = n;
        }
        
    }

    greet(phrase: string){
        console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable;

user1 = new Person();
user1.greet('Hello there');



//Definiendo una interface como una funcion vs como type
//como type:
type Add1 = (n1: number, n2: number) => number;

//como interface:
interface Add2 {
    (n1: number, n2: number) : number;
} 

let addFn1: Add1;
addFn1 = (n1:number, n2: number) => {
    return n1 + n2;
}

let addFn2: Add2;
addFn2 = (a: number, b: number) => {
    return a + b;
}

// Intersection types
// con types:
type Admin = {
    name: string,
    privileges: string[]
}

type Employee = {
    name: string,
    startDate: Date//TS utiliza el tipo Date de JS
}

//en este caso el tipo obtenido con la interseccion va a ser en realidad como una union
type ElevatedEmployee = Admin & Employee;
const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

//Intersection Types a partir de Union Types:
type Combinable = number | string;
type Numeric = number | boolean;

//En este caso el intersection type se comportará como una verdadera interseccion
//en este ejemplo, Universal terminará siendo de tipo number
type Universal = Combinable & Numeric;
//let uni1: Universal = true;  esto da error
let unit2: Universal = 23;

//Type Guards
//usando los tipos creados antes
function add(n1: Combinable, n2: Combinable){
    //esto es un Guard, es decir, un check de tipos para evitar errores
    if(typeof n1 === 'string' || typeof n2 === 'string'){
      return n1.toString() + n2.toString();
    }
    return n1 + n2;
}

type UnknownEmployee = Admin | Employee;
function printEmployeeInformation(emp: UnknownEmployee){
    console.log(emp.name);
    if('privileges' in emp){//este es otro Guard o check de tipo
        console.log(emp.privileges);
    }
}

printEmployeeInformation(e1);

//con objetos y union types
class Car {
    drive(){
        console.log('Driving a Car...');
    }
}

class Truck {
    drive(){
        console.log('Driving a Truck...');
    }
    loadCargo(amount:  number){
        console.log('Loading cargo...' + amount);
    }

}   

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if(vehicle instanceof Truck){
        vehicle.loadCargo(10000);
    }
}

useVehicle(v1);
useVehicle(v2);


  

