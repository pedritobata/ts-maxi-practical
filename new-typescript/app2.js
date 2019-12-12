"use strict";
//Tipo unknown. Este tipo es especial de TS
var userInput;
var userName;
//a una variable unknown le puedo asignar cualquier tipo o literal bien definido
userInput = 'Mario';
userInput = 4;
//pero No puedo asignar unknown a ningun otro tipo!
//userName = userInput;//esto NO compila
//unknown es como any pero mas restrictivo!!
//para generar un archivo de configuracion para TS, correr:  tsc --init
//con ese archivo generado, para compilar tooodos los archivo .ts que
//tenga al mismo nivel de ese archvo ,correr :  tsc -w  o   tsc --watch
var button = document.getElementById('btn');
//cuando estamos en opcion "strict": true  dentro del tsconfig.json,
//TS no compilará la siguiente linea porque button puede llegar a ser null o undefined
//Para evitar esto, se podria habilitar: "strictNullChecks": false, para que deje pasar 
//las posibles checked exceptions (hablando como si fuera Java) .
//Ver tambien que el problema se puede evitar tambien usando el signo "!"
//const button = document.getElementById('btn')!;
//o tambien se puede usar un condicional tipo if(button) ....
if (button) {
    button.addEventListener('click', function () {
        console.log('clicked!!');
    });
}
//TS puede inferir tipos de variables pero NO de argumentos de funciones
var numero;
//si no le pongo tipo al argumento data, TS no compilará
//function numerao(data){
function numerao(data) {
    numero = 3; //a pesar que no definimos el tipo de esta variable antes, al ponerle el valor 3
    //TS infiere su tipo
}
//Hay excepciones para inferir el tipo de los argumentos. 
//TS sí puede inferir el argumento cuando este le pertenece a una funcion conocida por TS o JS,
//por ejemplo de una funcion del API del DOM.
//Aqui el argumento event es inferido porque es parametro de addEventListener y es de tipo MouseEvent
if (button) {
    button.addEventListener('click', function (event) {
        console.log('clicked!!');
    });
}
//Default parameters
//solo se puede aplicar valor por default a los ultimos argumentos o a todos pero NUNCA al primero solo!!
var addition = function (a, b) {
    if (a === void 0) { a = 2; }
    if (b === void 0) { b = 1; }
    return a + b;
};
addition(2);
