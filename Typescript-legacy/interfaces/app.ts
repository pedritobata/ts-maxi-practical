//este truco es IMPORTANTE
//TS solo considera que este archivo es un modulo independiente solo si tiene
//algun import o export, sin importar el que sea
//si no los hubiera se considerará este archivo como parte del scope global
// y eso haria que este codigo choque con el codigo de otros archivos en la misma condicion global!!!
//esto va a originar que choquen variables o funciones con el mismo nombre en diferentes archivos
//para que el browser reconozca los modulos se debe poner <script type="module" > 
//para otra version de TS , el hack para el browser es agregar <script>var exports = {}; </script>
export {};

interface IPerson{
    firstName: string;
}

function greet(person: IPerson){
    console.log('Hello,', person.firstName);
}

function changeName(person: IPerson, newName: string){
    person.firstName = newName;
    greet(person);
}

const person = {
    firstName: 'Perico',
    age: 44
}

greet(person);
changeName(person, 'Tato');