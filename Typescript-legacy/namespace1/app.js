//este archivo va a consumir al namespace MyMath
//para esto en la vista tendria que linkear a este archivo y a los otros dos
//que contienen a los mini archivos que definen el namespace
//otra forma es compilar de una manera especial y unir todos los 
//archivos necesarios en un bundle, en este caso ese bundle será app.js, el argumento que
//le sigue inmediatamente a --outfile (outfile define el archivo que será el destino del bundle)
// tsc --outfile app.js circlemath.ts rectangleMath.ts app.ts
//ya no se generan los .js de los otros .ts  solo se genera el app.js
//Otra forma es referenciar a los mini archivos desde aqui. Eso tiene su sintaxis especial
//la cual empieza con tres slashes
/// <reference  path="circleMath.ts" />
/// <reference  path="rectangleMath.ts" />
//para correr esto seria:
// tsc --outfile app.js app.ts
//Como en circleMath he creado un namespace anidado llamado Circle
//le puedo asignar un alias usando import
var Circle = MyMath.Circle;
console.log(MyMath.calcCircumsference(8));
console.log(Circle.calcRectangle(3, 9));
