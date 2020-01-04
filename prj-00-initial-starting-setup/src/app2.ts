//truco para no chocar con otros archivos y que se considere este archivo como un modulo independiente!
export {};

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


    private configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    atach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();

const acitveProjects = new ProjectList('active'); 
const finishedProjects = new ProjectList('finished'); 