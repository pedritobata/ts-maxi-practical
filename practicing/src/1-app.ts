const c = console.log;

c("Practicando lo basico!!");

let unNumero: number ;
unNumero = 100;
c("numero:", unNumero);

let unaCadena: string = "Hola mundo";
c(unaCadena);

//arreglo
let arreglo: number[];
arreglo = [1,2,3];
c("El arreglo tiene", arreglo.length, "elementos");

//tupla
let tuplon: [number, string] = [1, "Perico"];
c("Rica tupla", tuplon);
tuplon.push("SI se puede agregar elementos a la tupla");
c("Rica tupla modificada", tuplon);

//enum
enum Pais{
    PERU, ARGENTINA, CHILE = 100, ECUADOR
}

c("enum de paises:", Pais.PERU, Pais.ARGENTINA, Pais.CHILE, Pais.ECUADOR);
