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
// Ademas usando ES6 imports, cada import se convierte en un request al servidor para que nos
//devuelva ese archivo .js, lo cual genera consumo de tiempo.
//Para solucionar eso , lo mejor sería usar un bundle que contenga todo el codigo js tal como cuando
//usamos los namespaces, pero manteniendo las ventajas de ES6 imports. la solucion: WEBPACK!!!


/********  USANDO WEBPACK ************/
//* instalamos los paquetes:
//npm install --save-dev webpack webpack-cli ts-loader typescript webpack-dev-server
//* verificar ciertas configuraciones del tsconfig.json:
//"target": "es6",  puede ser es5 tambien
//"module": "2015",
//comentar esto :  "rootDir": "./src",,  ya no se necesitará el rootDir, webpack descifrará nuestro
//sistema de files
//* Todos los ES6 imports de mi proyecto YA NO DEBEN INCLUIR LA EXTENSIÓN .js
//* crear el file webpack.config.js en la carpeta raiz del proyecto (la que queramos que sea la raiz)
//el nombre del archivo debe ser EXACTAMENTE ESE para que webpack lo reconozca
//* chekea ahora ese archivo pa' que veas como se configura webpack!!






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

//***** USANDP THRID PARTY LIBRARIES hechas en vanilla js No en typescript */
//por ejemplo podemos usar un paquete cualquiera que necesitemos, p.e lodash, el cual lo instalamos normal: 
// npm install lodash
// cuando lo importamos nos saldrá error al correr la app : import _ from 'lodash';
// esto pasa porque estamos usando typescript y webpack lo hemos configurado para eso
// podemos solucionar esto de dos formas:
//Una forma es cambiar una configuracion en tsconfig:  "noEmitOnError": false,
//con eso, decimos a TS que compile a pesar qde que hayan errores, y funcará.
// la mejor solucion es instalar paquetes del tipo types.
//estos paquetes son una replica de los paquetes originales que estaban en vanilla js y han sido
//clonados y adaptados a TS!! sus archivos tienen la extension .d.ts 
//para lodash por ejemplo instalo:  npm install --save-dev @types/lodash
//solo con instalar eso , mi import:  import _ from 'lodash'; ya funcionará!!! sin necesidad de noEmitOnError
