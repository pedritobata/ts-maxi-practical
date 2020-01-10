import React from 'react';

interface TodoListProps{
    items: {id:string, title: string}[]
}

const TodoList: React.FC<TodoListProps> = props => {

    return <ul>
        {props.items.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
}

export default TodoList;