//los namespace son como dividir un archivo en mini arhcivos que se pueden repartir a
//traves de mis modulos. todos los mini archivos que tengan el mismo namespace
//se podran invocar haciendo referencia al nombre del namespace y acceder a sus metodos o atributos
//que hayan sido exportados
var MyMath;
(function (MyMath) {
    var PI = 3.1415;
    function calcCircumsference(diameter) {
        return PI * diameter;
    }
    MyMath.calcCircumsference = calcCircumsference;
})(MyMath || (MyMath = {}));
