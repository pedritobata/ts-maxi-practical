/// <reference path="base-component.ts" /> 
/// <reference path="../models/project.ts" /> 
/// <reference path="../models/drag-drop.ts" /> 
/// <reference path="../util/validation.ts" /> 

namespace App{
    export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
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
    
}