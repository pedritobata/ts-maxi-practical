// Code goes here!

enum ProjectStatus{
    Active,
    Finished
}

class Project{
    constructor(public id: string, public title: string,
        public description: string, public people: number, public status: ProjectStatus){

    }
}

type Listener = (items: Project[]) => void;

//Manejo del state usando una clase
class ProjectState{
    private projects: Project[] = [];
    private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor(){

    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;   
    }

    addListener(listener: Listener){
        this.listeners.push(listener);
    }

    addProject(title: string, description: string, people: number){
        const project = new Project( Math.random().toString(),title,description,people, ProjectStatus.Active);
        this.projects.push(project);
        for(const listenerFn of this.listeners){
            console.log('project added');
            listenerFn(this.projects.slice());
        }
    }
}

//instanciamos el estado globalmente
const projectState = ProjectState.getInstance();



//Validation
//usaremos una interface. pudo ser tambien una class o un type
interface Validatable {
    value: string | number;
    required?: boolean;//el signo "?" equivale a un union type: boolean | undefined
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable): boolean{
    let isValid = true;
    //si el objeto contiene el atributo required esto será diferente de undefined y por lo 
    //tanto se cumplirá la condicion de validar el required
    if(validatableInput.required){
        //recien validamos si el campo ha sido llenado
        isValid = isValid && validatableInput.value.toString().length > 0;
    }
    //comparamos usando solo un signo "=" porque para coercion null es igual que undefined!!
    //ademas validamos que sea un string , ya que un numero no tiene sentido validarlo por su longitud como cadena
    if(validatableInput.minLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength;
    }
    if(validatableInput.maxLength != null && typeof validatableInput.value === 'string'){
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength;
    }

    if(validatableInput.min != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if(validatableInput.max != null && typeof validatableInput.value === 'number'){
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

//bind decorator
//no necesito los dos primeros args, osea el target y el method name
function autobind(_:any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}


class ProjectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished'){
        this.assignedProjects = [];
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[]) => {
            const filteredProjects = projects.filter(prItem => {
                if(this.type === 'active'){
                    return prItem.status === ProjectStatus.Active;
                }
                return prItem.status === ProjectStatus.Finished;
                
            });
            this.assignedProjects = filteredProjects;
            this.renderProjects();
        });

        this.atach();
        this.renderContent();
    }

    renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        //limpiamos la vista para que no se repitan los elementos que ya existen en la lista
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }

    renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    atach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}



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

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }


    //void es como undefinded pero para funciones
    //esta funcion retorna una tupla si la validacion pasó
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        //validamos todos los campos con la funcion validate que creamos
        const validatableTitle: Validatable = {
            value: enteredTitle,
            required: true
        }
        const validatableDescription: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const validatablePeople: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1
        }
        if(!validate(validatableTitle) ||
            !validate(validatableDescription) ||
            !validate(validatablePeople)){
            alert('Invalid input, please try achen!!');
            return;//acá retornamos void que es lo mismo que undefined
        }else{
            //recordar que enteredPeople se recibió como un string desde el html.
            //por lo tanto lo casteamos a number anteponiendo el sigo "+"
            return [enteredTitle,enteredDescription, +enteredPeople];
        }
    } 


    @autobind
    //hay que habilitar en el tsconfig :  "experimentalDecorators": true
    private submitHandler(event: Event){
        event.preventDefault();
        //ojo que el this funcionará en el listener del browser por el autobind
        const userInput = this.gatherUserInput();
        //como gatherUserInput devuelve undefined o una tupla, validamos que se haya obtenido
        //una tupla para poder acceder a sus elementos
        //lastimosamente no existe el tipo "tuple" o algo asi como para poder hacer typeof var == 'tuple'
        //usamos Array, ya que una tupla al final es un array!!
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProject(title,desc,people);
            this.clearInputs();
        }
       
    }


    private configure(){
        //OJO que submithandler usa this en su logica, y como estamos suscribiendolo a un listener que será
        //ejecutado en la vista, el this va a mancar , por eso usamos el bind()!!!
        //haremos el bind en un decorator arriba
        //this.element.addEventListener('submit', this.submitHandler.bind(this));
        this.element.addEventListener('submit', this.submitHandler);
    }

    atach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

//instaciamos la clase para que el constructor se ejecute y se renderice nuestro html
const prjInput1 = new ProjectInput();
//instanciamos las listas de projects
const acitveProjects = new ProjectList('active'); 
const finishedProjects = new ProjectList('finished'); 