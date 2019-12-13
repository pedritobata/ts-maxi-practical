export {};

//Some built-in generic types
const names: Array<string> = [];
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
function merge<T, U>(objA: T, objB: U){
    return Object.assign(objA, objB);
}
const merged = merge({name:"Tato"}, {age: 44});
//el objeto merged es el resultante de la funcion generica, en este caso
//es del tipo interseccion:  {name: string} & {age: number} 
console.log(merged.age);

//generics con constraints:
function merge2<T extends object, U extends object>(objA: T, objB: U){
    //para que funcione Object.assign hemos configurado en tsconfig.json:
    //"lib": ["es2015", "es2017", "dom"]
    return Object.assign(objA, objB);
}
//esto no funca porque 30 No es object
// const merged2 = merge2({name:"Perico"}, 30);
const merged2 = merge2({name:"Perico"}, {age: 40});

//otra funcion generica. para calcular por ejemplo el numero de items
//que contiene cualquier elemento de un tipo que tenga la propiedad length
//por ejemplo un String o un Array

interface Lengthy{
    length: number
}
//esta funcion devolverá una tupla
function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
    let description = "Got no value.";
    if(element.length === 1){
        description =  "Got 1 element.";
    }else if(element.length > 1){
        description = "Got " + element.length + " elements.";
    }
    return [element, description];
}

console.log(countAndDescribe("Esa es buena"));

//Asegurarse que un elemento sea key de un Objeto usando keyof
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return "Value: " + obj[key];
}

console.log(extractAndConvert({name: "Pedro"}, "name"));

//Generic classes
class DataStorage<T extends string | number | boolean>{
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        if(this.data.indexOf(item) === -1){
            return;
        }
        this.data.splice(this.data.indexOf(item),1);
    }

    getData(){
        // devolvemos una copia del array para que no se pueda modificar de afuera
        return [...this.data];
    }

}

const textStorage = new DataStorage<string>();
textStorage.addItem("Perico");
textStorage.addItem("Fernandillo");
textStorage.addItem("Rapha");
textStorage.removeItem("Rapha");
console.log(textStorage.getData());

//Partials nos permite generar un wrapper para un tipo de objeto que necesitemos
//que se sus atributos sean opcionales y poder declararlo vacio en un inicio
//e ir llenando los atributos 1 por 1
interface CourseGoal{
    title: string,
    description: string,
    completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal{
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

//Readonly , otro generic utilitario
//sirve para volver un objeto como inmutable, solo de lectura
const namesArray: Readonly<string[]> = ['Pedro', 'Martinez'];
//namesArray.push('Fer'); esto falla

// IMPORTANTE  Generics vs Union Types
//Generics solo admiten UN tipo de dato para toda una determinada clase o funcion
//Union types admiten varios tipos de dato para una determinada clase o funcion