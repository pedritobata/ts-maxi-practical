//truco para no chocar con otros archivos y que se considere este archivo como un modulo independiente!
export {};

//Drag and Drop interfaces
//solo nos serviran para definir cuales deben ser los eventos que escucharán mis componentes
//que sean capaces de drag and drop y deberán implementar un comportamiento para cada evento!!
//Osea , en resumen, estas interfaces indican cuales serán los listeners que deben implementar!!
interface Draggable{
    //DragEvent es un evento propio del DOM
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget{
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus{
    Active,
    Finished
}

class Project{
    constructor(public id: string, public title: string,
        public description: string, public people: number, public status: ProjectStatus){

    }
}

//Ojo que se pueden definir types genericos!!!
type Listener<T> = (items: T[]) => void;

class State<T>{
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>){
        this.listeners.push(listener);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
   
    private static instance: ProjectState;

    private constructor(){
        super();
    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;   
    }

    addProject(title: string, description: string, people: number){
        const project = new Project( Math.random().toString(),title,description,people, ProjectStatus.Active);
        this.projects.push(project);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus){
        const project = this.projects.find(prj => prj.id === projectId);
        //si existe el project y solo si ha cambiado de status
        // refrescamos las listas con el nuevo status
        if(project && project.status !== newStatus){
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners(){
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();



//Validation
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
    if(validatableInput.required){
        isValid = isValid && validatableInput.value.toString().length > 0;
    }
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

/** Clase abstracta que representará un component generico, sería el equivalente a React.Component
 * 
 */
abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostId: string, insertAtStart: boolean, newElementId?: string){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId)! as T;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId){
            this.element.id = newElementId;
        }

        this.atach(insertAtStart);

    }


    atach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning? 'afterbegin' : 'beforeend',
         this.element);
    }

    //Los metodos abstractos NO pueden ser private en TS!!!
    abstract configure(): void;
    abstract renderContent(): void;

}

class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
    project: Project;

    //usamos un getter para que nos devuelva el nnumero de personas
    //asignadas al project pero formateado para plural o singular segun sea el caso
    get persons(){
        if(this.project.people === 1){
            return '1 Person';
        }
        return `${this.project.people} Persons`
    }

    constructor(hostId: string, project: Project){
        super('single-project',hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent){
        //vamos a transferir data al elemento receptor
        //el primer argumento es el tipo de data que permitimos transferir
        //este tipo de dato son palabras reservadas
        event.dataTransfer!.setData('text/plain', this.project.id);
        //indicamos al browser que tipo de efecto queremos, en este caso es un move No un copy
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent){
        console.log('DragEnd');
    }

    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}


class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished'){
        super('project-list','app',false, `${type}-projects`);
        this.assignedProjects = [];
        
        
        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent){
        //verificamos que el evento que llega tenga un contenido de texto
        //lo cual es justamente lo que nos dirá que nuestro componente efectivamente debe recibir 
        //el drop
        if(event.dataTransfer && event.dataTransfer!.types[0] === 'text/plain'){
            //el comportamiento por default del dragOver es NO permitir el drop
            //asi que lo anulamos para SI permitir el drop
            event.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add('droppable');
        }
        
    }

    @autobind
    dropHandler(event: DragEvent){
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, 
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind
    dragLeaveHandler(_: DragEvent){
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove('droppable');
    }

    renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }

    renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    //como tenemos que implementar obligatoriamente el metodo configure aprovechamos
    //para hacer aquí la suscripcion de mi listener al state general
    configure() {
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

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

    }
   
}



class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
   
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        super('project-input','app',true,'user-input');
        
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
    }

    //Por convencion primero colocamos los metodos public y despues los private

    configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(){}

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }


    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
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
            return;
        }else{
            return [enteredTitle,enteredDescription, +enteredPeople];
        }
    } 


    @autobind
    //hay que habilitar en el tsconfig :  "experimentalDecorators": true
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
    
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProject(title,desc,people);
            this.clearInputs();
        }
       
    }

}

const prjInput = new ProjectInput();

const acitveProjects = new ProjectList('active'); 
const finishedProjects = new ProjectList('finished'); 