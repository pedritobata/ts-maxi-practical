namespace App{
    /** Clase abstracta que representará un component generico, sería el equivalente a React.Component
 * 
 */
export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
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
}