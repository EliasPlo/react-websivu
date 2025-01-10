import React, { useState } from 'react';

const Laskuri = () => {
  const [ count, setCount] = useState(0);

  const increment = () => 
    setCount(count + 1);

  return (
    <div>
      <p>Laskuri: {count}</p>
      <button onClick={increment}>Lisää</button>
    </div>
  );
};

export default Laskuri;
