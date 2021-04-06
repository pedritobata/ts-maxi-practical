import React, { useState } from "react";
import './Counter.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = (
    increment: number,
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //console.log(ev);
    setCount(count + increment);
  };

  return (
    <div className="counter">
      <h2>Counter</h2>
      <span className="counter__count">{count}</span>
      <button onClick={handleClick.bind(null, 1)}>+ 1</button>
      <button onClick={handleClick.bind(null, 2)}>+ 2</button>
      <button onClick={handleClick.bind(null, -1)}>- 1</button>
    </div>
  );
};

export default Counter;
