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
        const hookEl = document.getElementById(hookId);
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

//Este decorator factory devolverá un decorator especial ...sigue viendo..
function WithTemplate2(template: string, hookId: string){
    //retornamos un decorator de clase. y como tal , este decorator es una funcion que recibe 
    //el constructor de la clase que va a decorar
     //OJO : como el constructor o clase original tiene un atributo name, tenemos que especificarle a TS
     //el tipo exacto. Usaremos un generic para eso
     //esto es raro pero ese generico se leería algo asi como:
     // "un tipo T que extiende a una clase u objeto , el cual tiene un metodo constructor (por el new),
     //el cual a su vez devuelve una clase u objeto del tipo que tiene un atributo name"
    return function<T extends { new(...args: any[]) : {name: string} }>(originalConstructor: T){
        //IMPORTANTISIMO!!!!!: el decorator WithTemplate2 SOLO SE EJECUTARÁ CUANDO LA CLASE PERSON SEA INSTANCIADA!!!!
        console.log("Executing WithTemplate 2");
        //!!!!!!!!!!acá viene lo especial!!!
        //los decorators de clase pueden devolver a su vez una clase!!
        //y esta clase reemplazará a la clase que decora. es este caso devolveremos
        //una clase que extienda a al original, o sea a la decorada. 
        //Recordar que tambien se puede devolver un constructor ya que en JS un constructor es practi-
        //camente una clase!!
       
        return class extends originalConstructor{
            //en este constructor no voy a recibir parametros extra
            //por lo tanto utilizo el underscore para que TS no se queje si no uso dentro de
            //mi clase a los parametros del constructor, que normalmente se representarían con ...args: any[]
            constructor(..._: any[]){
                super();//invocamos a la clase original para mantener su funcionalidad
                //funcionalidad de esta nueva clase
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('p')!.textContent = this.name;
                }
            }
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
@WithTemplate2('<h2>Hola Template 2! <p></p></h2>', 'app2')
class Person{
    name: string = 'Max';

    constructor(){
        console.log("Creating Person Object");
    }

    getName(){
        return this.name;
    }
}

//IMPORTANTISIMO!!!!!: el decorator WithTemplate2 SOLO SE EJECUTARÁ CUANDO LA CLASE PERSON SEA INSTANCIADA!!!!
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

//Otro decorator que puede hacer algo especial es el decorator de metodos o de accessors
//estos decorators pueden retornar un PropertyDescriptor que reemplazará al original
//como los dos primeros argumentos que recibe este decorator son el prototype y el name , y ambos
//no me interesan, usamos el underscore
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    //el PropertyDescriptor contiene configuraciones, atributos o metodos que definen a un metodo
    //uno de esos recursos es el atributo value, el cual contiene al propio metodo
    //en este caso salvamos el metodo original, ya que necesitamos su implementacion
    //solo le vamos a agregar funcionalidad extra
    const originalMethod = descriptor.value;
    //definimos al descriptor que reemplazará al original
    const adjDescriptor = {
        configurable: true,
        enumerable: false, //por curiosidad, esta propiedad indica si el objeto es iterable con for-in
        //acá TS nos proporciona una propiedad especial que es un metodo get, el cual sirve para implementar
        //nuestra logica extra o decoradora y tenemos que devolver el nuevo metodo reloaded!!
        get(){
            //aca hacemos el bind que nos permitirá usar el this correcto y no el del browser
            //esto está asegurado en que va a funcionar porque este nuevo metodo será invocado dentro de la clase
            //cuando esta se est´cargando, por lo tanto el this se cargará apuntando a al clase y así llegará 
            //hasta el browser!!
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }

    //retornamos el descriptor que reemplaza al original
    return adjDescriptor;
}


class Printer{
    message: string = "This works!!";

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}

const printer = new Printer();
const btn = document.querySelector('#btn2')!;//ojo con el "!", recordar que TS se queja si no ponemos eso
//aca esta el guardia. Cuando se haga click al boton, como showMessage utiliza this en su logica, 
//this será undefined porque estaría siendo invocado desde el contexto del browser
//la solucion es el famoso bind!!!!
//nuestro decorator se encarga de eso
btn.addEventListener('click', printer.showMessage);
