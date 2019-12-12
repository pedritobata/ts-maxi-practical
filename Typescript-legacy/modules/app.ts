//para que TS reconozca esta forma de import y sea compilado a ES6 el cual usa require,
//se ha definido la propiedad "module": "commonjs",  dentro del tsconfig.json
//Para que el bundle final pueda ser reconocido en el browser con la sintaxis para 
//cargar modules (como require) y etc,
//debemos instalar un package llamado systemjs version 0.21.5
//hay que incluir el script de systemjs (está dentro de node_modules) en el html y 
//una pequeña configuracion en otro script dentro del html
//eso está en la documentacion de systemjs
//Podemos hacer todos los imports y exports que ya usamos en React !!!
import { PI, calculateCircumsference } from './math/circle';

console.log(PI);
console.log(calculateCircumsference(5));