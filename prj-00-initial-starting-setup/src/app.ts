//truco para no chocar con otros archivos y que se considere este archivo como un modulo independiente!
//usando namespace ya no hace falta este truco
//export {};

//Para importar namespaces usamos exactamente 3 slashes!!!
//recordar que los imports se hacen por orden de arriba hacia abajo de modo que
//si un file depende de otro debería importarse debajo de su dependencia!!!
//OJO si quito una referencia de acá que sí se necesita, pero algun otro file del namespace la
//esta importando o la misma dependencia está en un order anterior en el bundle. el compilador NO
//me va a marcar el error o falta de dependencia!!
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />



//******* PARA IMPORTS TIPO ES6  ***************/
//se debe importar el file CON LA EXTENSION .js, por ejemplo:
// import { something } from "some-file.js;"
//estos imports solo funcionan para browser modernos que implementen ES6!!!!
//Asimismo se tiene que cambiar una configuracion del tsconfig.json:
//   "module": "es2015", 
//   "target": "es6",  target como minimo es6
// Ademas el compilador generará una replica de mi sistema de files tal como estan en mi proyecto .ts
//entonces faltaría en el html:
//  linkear a app.js y ya NO a bundle.js!! y poner el type en "module" (con esto decimos al browser
// que vamos a utilizar ES6!):
//  <script type="module" src='dist/app.js'></script>



//IMPORTANTISIMO ******
//Para Typescript, todo funciona bien con los namespaces y el compilador no se queja
//pero para que funcione la app en el browser, tenemos que configurar el tsconfig.json para
//que genere un solo archivo bundle.js y este se linkee al html!!!
//las configuraciones son:
// "outFile": "./dist/bundle.js",   
// "module": "amd",
namespace App{


const prjInput = new ProjectInput();

const acitveProjects = new ProjectList('active'); 
const finishedProjects = new ProjectList('finished'); 
}

