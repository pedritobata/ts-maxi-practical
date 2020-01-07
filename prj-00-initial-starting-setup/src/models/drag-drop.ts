
//El namespace sirve para poder escribir codigo en diferentes archivos y que
//estos se puedan enlazar a traves del mismo namespace
namespace App{
    //Drag and Drop interfaces
//solo nos serviran para definir cuales deben ser los eventos que escucharán mis componentes
//que sean capaces de drag and drop y deberán implementar un comportamiento para cada evento!!
//Osea , en resumen, estas interfaces indican cuales serán los listeners que deben implementar!!

//Como estamos usando namespace debemos exportar todo lo que necesitamos compartir con los otros
//archivos que pertencen al mismo namespace
export interface Draggable{
    //DragEvent es un evento propio del DOM
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget{
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

}