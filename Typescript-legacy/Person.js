var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    //En los argumentos del constructor se puede especificar el modificador de acceso de un
    //atributo y esto funcionaria como un atajo para no declarar el atributo arriba y luego
    //asignarle su valor dentro del constructor con this. En este ejemplo, hemos usado el 
    //atajo con username
    function Person(name, username) {
        this.username = username;
        this.age = 44; //se puede asignar valores por default
        this.name = name;
    }
    //public method
    Person.prototype.printAge = function () {
        console.log(this.age);
    };
    //este es un setter. puedo obviar el modificador public si quiero
    //ojo que los metodos tambien pueden ser private o protected
    Person.prototype.setType = function (type) {
        this.type = type;
        console.log('New type:', this.type);
    };
    return Person;
}());
var person = new Person('Perico', 'pedrito');
console.log(person.name, person.username);
person.printAge();
person.setType('Cool guy!!');
//Inheritance
var Max = /** @class */ (function (_super) {
    __extends(Max, _super);
    //Max hereda el constructor, pero este NO servirá para asignar valor al atributo sobreescrito
    //ver mas abajo
    //tambien puedo crear su propio constructor pero
    //tengo que llamar al super obligado. Igual que Java, solo que en Java el compilador es el
    //que agrega esa llamada
    function Max(username) {
        var _this = 
        //por mas que quiera asignar otro name diferente al que he sobreescrito arriba
        //esto no será posible porque estoy usando el constructor heredado y
        //el atributo sobreescrito predomina
        _super.call(this, "Maxi", username) || this;
        //sobreescribo el atributo name
        _this.name = 'Max';
        //puedo acceder al atributo age porque es protected
        _this.age = 24;
        return _this;
    }
    return Max;
}(Person));
//los miembros privados No se heredan
//const max = new Max('Anna', "maxito");
var max = new Max("maximi");
console.log(max);
var Plant = /** @class */ (function () {
    function Plant() {
        //usamo el underscore por convencion para miembros que
        //tienen getter y setter
        this._species = 'Default';
    }
    Object.defineProperty(Plant.prototype, "species", {
        //usamos la keyboard get seguido del nombre del atributo sin underscore
        //esto es una convencion pero no es mandatorio
        //practicamente los setter y getter son considerados como propiedades y no metodos
        //aunque se escriban como metodos
        get: function () {
            return this._species;
            //return "El getter tiene prioridad sobre el underscore";
        },
        set: function (value) {
            if (value.length > 3) {
                this._species = value;
            }
            else {
                this._species = 'Default';
            }
        },
        enumerable: true,
        configurable: true
    });
    return Plant;
}());
var plant = new Plant();
//los getter y setter se invocan como si fueran propiedades y SIN underscore
console.log(plant.species);
plant.species = "AB";
console.log(plant.species);
plant.species = "Periquito pin pin";
console.log(plant.species);
//metodos y atriubutos static
var Helper = /** @class */ (function () {
    function Helper() {
    }
    //Ojo que igual que Java, un metodo static solo opera sobre atributos static
    Helper.calcCircumference = function (diameter) {
        return this.PI * diameter;
    };
    Helper.PI = 3.1415;
    return Helper;
}());
console.log(Helper.PI);
console.log(Helper.calcCircumference(8));
//Abstract classes
var Project = /** @class */ (function () {
    function Project() {
        this.projectName = "Default";
    }
    Project.prototype.calcBudget = function () {
        return this.budget * 2;
    };
    return Project;
}());
var ITProject = /** @class */ (function (_super) {
    __extends(ITProject, _super);
    function ITProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ITProject.prototype.changeName = function (name) {
        this.projectName = name;
    };
    return ITProject;
}(Project));
var newProject = new ITProject();
//OJO que TS no me muestra en consola los atributos que no hayan sido inicializados!!
console.log(newProject);
newProject.changeName("Super Project");
console.log(newProject);
// Patron Singleton
//Permitido a partir de TS 2 debido al uso de constructor privado
var OnlyOne = /** @class */ (function () {
    //al poner public como argumento, recordar que es un atajo para no definir el atributo arriba
    //con el atajo me ahorro declarar arriba y asignar dentro del constructor
    //si agrego el modificador readonly de TS 2, es como si 
    //hubiera creado un getter para ese atributo y NO un setter
    function OnlyOne(name) {
        this.name = name;
    }
    OnlyOne.getInstance = function () {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne("Soy un Singleton");
        }
        return OnlyOne.instance;
    };
    return OnlyOne;
}());
var singleton = OnlyOne.getInstance();
console.log(singleton);
//con readonly, solo tenemos disponible el metodo getter y NO el setter
//notese que readonly es como un atajo y ya no se escribe el metodo getter!!
//singleton.name = "Puedo acceder a los atributos publicos y modificarlos";
console.log(singleton.name);
