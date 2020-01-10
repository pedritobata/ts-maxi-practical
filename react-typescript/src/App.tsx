import React from 'react';
import TodoList from './components/TodoList';

//Hemos creado esta aplicacion usando:
//  npx create-react-app <nombre de mi app> --typescript

//TS nos ayuda con clases creadas para React.js
//Por ejemplo FC es una clase (atajo para FunctionComponent) que indica que nuestra constante
//App es un functional component que React reconocerá
const App: React.FC = () => {

  const todos = [{id: 't1', title: 'Finish the course'}]

  return (
    <div className="App">
       <TodoList items={todos} />
    </div>
  );
}

export default App;
