/// <reference path="../models/project.ts" /> 

namespace App{
    //Ojo que se pueden definir types genericos!!!
type Listener<T> = (items: T[]) => void;

class State<T>{
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>){
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project>{
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

export const projectState = ProjectState.getInstance();
}