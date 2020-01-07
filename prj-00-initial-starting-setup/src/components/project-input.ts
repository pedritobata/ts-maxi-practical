/// <reference path="base-component.ts" /> 
/// <reference path="../decorators/autobind.ts" /> 
/// <reference path="../util/validation.ts" /> 
/// <reference path="../state/project-state.ts" /> 

namespace App{
    export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
   
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
}