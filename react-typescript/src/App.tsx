import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

//Hemos creado esta aplicacion usando:
//  npx create-react-app <nombre de mi app> --typescript

//TS nos ayuda con clases creadas para React.js
//Por ejemplo FC es una clase (atajo para FunctionComponent) que indica que nuestra constante
//App es un functional component que React reconocerá
const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    setTodos(prevState => [...prevState ,{id: Math.random().toString(), text: text}]);
  }

  const deleteTodoHandler = (id: string) => {
    setTodos(prevState => {
      return prevState.filter(todo => todo.id !== id);
    });
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodoHandler}/>
       <TodoList onDeleteTodo={deleteTodoHandler} items={todos} />
    </div>
  );
}

export default App;
