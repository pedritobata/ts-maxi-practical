export {};
//Al parecer cuando definimos classes o interfaces como objetos (sintacticamente), podemos
//conbinar las declaraciones de sus propiedades como json o como tipos declarados
//hasta se puede usar punto y coma!
interface Bird {
    type: 'bird';//asignacion tipo json
    flyingSpeed: number;// declaracion de tipo
}

interface Horse{
    type: 'horse',
    runningSpeed: number
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal){
    let speed;
    if(animal.type === 'bird'){
        speed = animal.flyingSpeed;
    }else{
        speed = animal.runningSpeed;
    }
    console.log('Running at speed...' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 120});

////CASTING
//const inputElement = <HTMLInputElement>document.getElementById('user-input')!;
const inputElement = document.getElementById('user-input')! as HTMLInputElement;
console.log(inputElement);
inputElement.value = 'Hi there!!';

//Index types
interface ErrorContainer{
    //definimos una especie de tipo dinamico que dice qué tipo de dato tiene esta interface
    //esto porque no sabemos de antemano por ejemplo que data queremos obtener de algun servicio
    //y los objeto que se deriven de esta  se ajustarán a eso
    [prop: string]: string;//acá decimos que acepta propiedades cuyo nombre es string y su valor tambien
}

let errorBag: ErrorContainer = {
    email: 'Invalid email',
    userName: 'Must star with Capital character.'
}


//Overload de funciones
type Combinable = string | number;

//escribimos las sobrecargas que soporta esta funcion (las signatures de los metodos)
function addition(a: number, b: number): number;
function addition(a: string, b: number): string;
function addition(a: number, b: string): string;
function addition(a: string, b: string): string;
function addition(a: Combinable, b: Combinable): Combinable{
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + ' ' + b.toString();
    }
    return a + b;
}

const comoString = addition('Pedro', 'Martinez');
//como  los dos argumentos son string y coinciden con uno de los overloads, entonces
//el resultado es string segun ese overload, por lo tanto podria aplicar un metodo de string al resultado
console.log(comoString.split(' '));

//OPTIONAL CHAINING
//suponemos que esta data llega desde un backend
const fetchedUserData = {
    id: 'u1',
    name: 'Perico',
    job: {title: 'CEO',description: "My Company"}
}
//con este truco evitamos que se caiga el programa al querer acceder a un dato que
//posiblemente no llegue del backend
console.log(fetchedUserData.job && fetchedUserData.job.title);
//puedo obtener la misma validacion usando chaining
console.log(fetchedUserData?.job?.title);

//NULLISH COALESCING
//el operador "??" sirve para validar si un valor es null o undefined , SOLO CUALQUIERA DE ESOS DOS
const userInput = '';
//si userInput fuera null o undefined, el resultado sería DEFAULT
const storeData = userInput ?? 'DEFAULT';
console.log(storeData);


