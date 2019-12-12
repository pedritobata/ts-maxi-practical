
class Person{
    //si no coloco modificador de acceso , es public por default
    name: string;
    private type: string;
    protected age: number = 44;//se puede asignar valores por default

    //En los argumentos del constructor se puede especificar el modificador de acceso de un
    //atributo y esto funcionaria como un atajo para no declarar el atributo arriba y luego
    //asignarle su valor dentro del constructor con this. En este ejemplo, hemos usado el 
    //atajo con username
    constructor(name: string, public username: string){
        this.name = name;
    }


    //public method
    public printAge(){
        console.log(this.age);
    }

    //este es un setter. puedo obviar el modificador public si quiero
    //ojo que los metodos tambien pueden ser private o protected
    public setType(type: string){
        this.type = type;
        console.log('New type:', this.type);
    }


}

const person = new Person('Perico','pedrito');
console.log(person.name, person.username);
person.printAge();
person.setType('Cool guy!!');


//Inheritance
class Max extends Person{
    //sobreescribo el atributo name
    name = 'Max';

    //Max hereda el constructor, pero este NO servirá para asignar valor al atributo sobreescrito
    //ver mas abajo
    //tambien puedo crear su propio constructor pero
    //tengo que llamar al super obligado. Igual que Java, solo que en Java el compilador es el
    //que agrega esa llamada
    constructor(username: string){
        //por mas que quiera asignar otro name diferente al que he sobreescrito arriba
        //esto no será posible porque estoy usando el constructor heredado y
        //el atributo sobreescrito predomina
        super("Maxi",username);
        //puedo acceder al atributo age porque es protected
        this.age = 24;
    }
}



//los miembros privados No se heredan
//const max = new Max('Anna', "maxito");
const max = new Max("maximi");
console.log(max);


class Plant{
    //usamo el underscore por convencion para miembros que
    //tienen getter y setter
    private _species: string = 'Default';

    //usamos la keyboard get seguido del nombre del atributo sin underscore
    //esto es una convencion pero no es mandatorio
    //practicamente los setter y getter son considerados como propiedades y no metodos
    //aunque se escriban como metodos
    get species(){
        return this._species;
        //return "El getter tiene prioridad sobre el underscore";
    } 

    set species(value: string){
        if(value.length > 3){
            this._species = value;
        }else{
            this._species = 'Default';
        }
    }

}

const plant = new Plant();
//los getter y setter se invocan como si fueran propiedades y SIN underscore
console.log(plant.species);
plant.species = "AB";
console.log(plant.species);
plant.species = "Periquito pin pin";
console.log(plant.species);

//metodos y atriubutos static
class Helper{
    static PI: number = 3.1415;

    //Ojo que igual que Java, un metodo static solo opera sobre atributos static
    static calcCircumference(diameter: number): number{
        return this.PI * diameter;
    }

}

console.log(Helper.PI);
console.log(Helper.calcCircumference(8));


//Abstract classes
abstract class Project{
    projectName: string = "Default";
    budget: number;

    abstract changeName(name: string):void;

    calcBudget(): number{
        return this.budget * 2;
    }

}

class ITProject extends Project{
    changeName(name: string): void{
        this.projectName = name;
    }
}

let newProject = new ITProject();
//OJO que TS no me muestra en consola los atributos que no hayan sido inicializados!!
console.log(newProject);
newProject.changeName("Super Project");
console.log(newProject);


// Patron Singleton
//Permitido a partir de TS 2 debido al uso de constructor privado
class OnlyOne{
    private static instance: OnlyOne;

    //al poner public como argumento, recordar que es un atajo para no definir el atributo arriba
    //con el atajo me ahorro declarar arriba y asignar dentro del constructor
    //si agrego el modificador readonly de TS 2, es como si 
    //hubiera creado un getter para ese atributo y NO un setter
    private constructor(public readonly name: string){

    }

    static getInstance(): OnlyOne{
        if(!OnlyOne.instance){
            OnlyOne.instance = new OnlyOne("Soy un Singleton");
        }
        return OnlyOne.instance;
    }
       

}

const singleton = OnlyOne.getInstance();
console.log(singleton);
//con readonly, solo tenemos disponible el metodo getter y NO el setter
//notese que readonly es como un atajo y ya no se escribe el metodo getter!!
//singleton.name = "Puedo acceder a los atributos publicos y modificarlos";

console.log(singleton.name);