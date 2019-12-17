export {};

//habilitar en tsconfig.json
// "target": "es6",  
//  "experimentalDecorators": true,   

//los decorators son funciones!!
//se acostumbra nombrarlas empezando con mayusculas
//El decorator se ejecuta en la fase en que TS registra la clase que es decorada
//NO es necesario que se cree una instancia de la clase para que se ejecute el decorator!!
//Un decorator que actua sobre una clase recibe como argumento al constructor
function Logger(target: Function){
    console.log("Logging...");
    console.log(target);
}

//Esta funcion es una factory de decorator
//devuelve una funcion decorator. la ventaja es que la funcion factory
//puede recibir los parametros extra que necesite pasarle a mi decorator
function LoggerFactory(logString: string){
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

//creamos un decorator mas caña. este puede renderizar algo en un nodo del DOM
function WithTemplate(template: string, hookId: string){
    return function(constructor: any){//ponemos al constructor tipo any porque TS no lo reconoce como Function
        const hookEl = document.getElementById('app');
        //esto es lo bacan del decorator
        //al acceder al constructor podemos instanciar la clase y acceder a sus atributos y metodos
        const p = new constructor();
        if(hookEl){
            hookEl.innerHTML = template;
            //aca asumo que el template contiene un parrafo p.
            //y como TS se queja porque podría no existir dicho p , utilizamos el "!" para asegurar
            //que el p existirá
            hookEl.querySelector('p')!.textContent = p.name;
        }
    }
}

//Cuando hay varios decorators aplicados a un elemento, las funciones decorators como tal se ejecutaran
//de arriba hacia abajo, desde las mas cercana a la clase hasta la mas lejana
//OJO: las funciones factory Sí se ejecutan de arriba hacia abajo ya que al final se comportan como
//meras funciones de JS
@Logger
@LoggerFactory('LOGGIN - PERSON')
@WithTemplate('<h2>Hola Template! <p></p></h2>', 'app')
class Person{
    name: string = 'Max';

    constructor(){
        console.log("Creating Person Object");
    }

    getName(){
        return this.name;
    }
}

const person = new Person();
//console.log(person);


//Decorator aplicado a un atributo
//recibe dos argumentos: proptotype del atributo y el nombre o simbolo del atributo
//El Decorator se ejecuta cuando se define el atributo en tiempo de carga de clases!!
function Log(target: any, propertyName: string | Symbol){
    console.log("Property Decorator!!");
    console.log(target,propertyName);
}

//decorator para metodos de acceso (getter o setter) o metodos normales
//Si el metodo es de instancia target devuelve el prototype de la clase
//Si el metodo es estatico target devuelve el constructor
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log("Method or Accesor Decorator!!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}


//Decorator de parametros
//target devuelve lo mismo que el decorator de metodos
//name es el nombre del metodo que contiene el parametro como argumento, NO el nombre del parametro
//position es el numero de orden que tiene el parametro en la lista de argumentos (empezando desde 0)
function Log3(target: any, name: string | Symbol, position: number){
    console.log("Params Decorator!!");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product{

    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number){
        if(val > 0){
            this._price = val;
        }else {
            throw new Error('Invalid price!!.');
        }
    }

    constructor(title: string, price: number){
        this.title = title;
        this._price = price;
    }

    @Log2
    getPriceWithTax(@Log3 tax: number){
        return this._price * (tax + 1);
    }
}
