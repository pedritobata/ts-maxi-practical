// Code goes here!

class ProjectInput{
    //podemos acceder a la api del DOM porque lo hemos especificado en el libs de tsconfig.json!!
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';//en el css hay un estilo especial para ese id!!

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.atach();
    }

    private submitHandler(event: Event){
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }


    private configure(){
        //OJO que submithandler usa this en su logica, y como estamos suscribiendolo a un listener que será
        //ejecutado en la vista, el this va a mancar , por eso usamos el bind()!!!
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    atach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

//instaciamos la clase para que el constructor se ejecute y se renderice nuestro html
const prjInput = new ProjectInput();