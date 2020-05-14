/// <reference path="base-component.ts" /> 
/// <reference path="../models/project.ts" /> 
/// <reference path="../models/drag-drop.ts" /> 
/// <reference path="../decorators/autobind.ts" /> 

namespace App{
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  
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
    
}