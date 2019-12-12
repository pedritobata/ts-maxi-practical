var MyMath;
(function (MyMath) {
    //esto es un namespace anidado
    var Circle;
    (function (Circle) {
        function calcRectangle(width, height) {
            return width * height;
        }
        Circle.calcRectangle = calcRectangle;
    })(Circle = MyMath.Circle || (MyMath.Circle = {}));
})(MyMath || (MyMath = {}));
