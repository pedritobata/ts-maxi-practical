console.log('Bienvenidos a Typescript new!! yeah!!');

//este es uno de los tipos de datos que introduce TS
//las tuplas indican una arreglo de tamaño fijo, 2 elementos
//y los tipos de cada elemento se define exactamente
let role: [number, string];
role = [1, 'admin'];
// role[1] = 3; esto da error

//Enum
//los elementos del enum los definimos como labels o strings, pero por dentro 
// en realidad TS les asigna numeros consecutivos desde el 0 para arriba
//ademas yo puedo asignar valores arbitrariamente, sean numeros o caddenas o ambos
//si asigno un numero por default solo a un elemento, los demas recibiran automaticamente
//valores consecutivos a partir de ese default
enum Profile{
    ADMIN, USER, MANAGER, SELLER
}

enum Movies{
    SCARY_MOVIE = 3, STAR_WARS = 'yeah', DIE_HARD = 12
}

console.log(Movies.SCARY_MOVIE);
console.log(Movies.STAR_WARS);
console.log(Profile.SELLER);

//Uso de Union Type
//y custom type
type Combinable = number | string;
function combine(input1: Combinable, input2: Combinable){
    let result;
    if(typeof input1 === 'number' && typeof input2 === 'number'){
        result = input1 + input2;
    }else {
        result = input2.toString() + input2.toString();
    }
    return result;

}

console.log(combine(60,30));
console.log(combine('Perico','Tato'));

//Literal Types
//TS considera a un literal como un tipo muy especifico
function literals(tipo: 'tipo1' | 'tipo2'): string{
    if(tipo === 'tipo1'){
        return 'Es el tipo 1';
    }
    if(tipo === 'tipo2'){
        return 'Es el tipo 2';
    }

    return '';
}


//Functions como tipos
function add(n1:number, n2: number): number{
    return n1 + n2;
}

function printResult(num: number) : void{
    console.log('Result:', num);
}

let combineValues = add;//EN otra version de TS, si no especificaba un tipo, este era any por default
//entonces podía asinar cualquier cosa a esa variable, un numero por ejemplo
//combineValues = 5;//pero con la version actual de TS ya no se puede!! esto da error

//asignar un tipo function generico
let generica: Function;
generica = add;//esto sí se puede porque generica y add son funciones. sin embargo esto no es muy recomendable
//por no ser muy preciso.
printResult(generica(2, 4));
//Mejor es definir las funciones con su tipo correcto
let especifica: () => number; //esta funcion no recibe argumentos y retorna un number
 especifica = () => {
     return 100;
 }

//callbacks void
function addAndHandle(a: number, b:number, cb: (result: number) => void) {
    const result = a + b;
    
    //aunque se especificó void como el retorno de este callback, 
    //TS me permite que el callback devuelva un valor al momento de definirlo en la invocacion de la 
    //funcion principal
    //En realidad void es como que dice que el resultado de ese callback no interesa dentro de la funcion
    //principal. asi que el usuario que defina el callback no esta obligado a hacerlo como void
    //const value = cb(result);
    //console.log('value:', value);

    //sin embargo, lo correcto es que mi funcion respete lo que esta definiendo
    cb(result);
}

addAndHandle(3, 6, (result => {
    console.log(result);
    return result;
}));
