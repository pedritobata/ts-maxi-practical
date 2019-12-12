// string
let myName: string = 'Max';
// myName = 28;

// number
let myAge: number = 27;
// myAge = 'Max';

// boolean
let hasHobbies: boolean = false;
// hasHobbies = 1;

// assign types
let myRealAge: number;
myRealAge = 27;
// myRealAge = '27';

// array
let hobbies: any[] = ["Cooking", "Sports"];
hobbies = [100];
// hobbies = 100;

// tuples
let address: [string, number] = ["Superstreet", 99];

// enum
enum Color {
    Gray, // 0
    Green = 100, // 100
    Blue = 2// 2
}
let myColor: Color = Color.Blue;
console.log(myColor);

// any
let car: any = "BMW";
console.log(car);
car = { brand: "BMW", series: 3};
console.log(car);

// functions
function returnMyName(): string {
    return myName;
}
console.log(returnMyName());

// void
function sayHello(): void {
    console.log("Hello!");
}

// argument types
function multiply(value1: number, value2: number): number {
    return value1 * value2;
}
// console.log(multiply(2, 'Max'));
console.log(multiply(10, 2));

// function types
let myMultiply: (a: number, b: number) => number;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 2));

// objects
let userData: { name: string, age: number } = {
    name: "Max",
    age: 27
};
// userData = {
//     a: "Hello",
//     b: 22
// };

// complex object
let complex: {data: number[], output: (all: boolean) => number[]} = {
    data: [100, 3.99, 10],

    output: function (all: boolean): number[] {
        return this.data;
    }
};
// complex = {};

// type alias

type Complex = {data: number[], output: (all: boolean) => number[]};

let complex2: Complex = {
    data: [100, 3.99, 10],

    output: function (all: boolean): number[] {
        return this.data;
    }
};

// union types
let myRealRealAge: number | string = 27;
myRealRealAge = "27";
//myRealRealAge = true;

// check types
let finalValue = 30;
if (typeof finalValue == "number") {
    console.log("Final value is a number");
}

// EN el archivo tsconfig.json
//"sourceMap": false,   si ponemos true podremos debuggear en chrome en la pestaña source
//"noEmitOnError": true   esta opcion en true dice que TS NO compile si hay errores
//ojo que el default es false y eso hace que TS compile aunque haya errores
//"noImplicitAny": false,  si lo ponemos en true significa que si declaramos una variable y
//no le asignamos un type, el default ya NO será any

//"strictNullChecks": false , si le ponemos true, TS va a analizar el flujo de
//nuestro codigo y buscar si hay una posibilidad de obtener un resultado null 
//"noUnusedParameters": false,  si lo ponemos en true, TS validará si hay variables sin usar
//por ejemplo
function controlMe(isTrue: boolean, somethingElse: boolean){//somethingElse nunca es usada
    let result: number;
    if(isTrue){
        result = 32;
    }
    //si isTrue es false, result se quedaria en null
    return result;
}