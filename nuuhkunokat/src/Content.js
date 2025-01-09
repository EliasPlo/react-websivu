import React from 'react';

const Content = (props) => {
  return (
    <main>
      <div>
        <h3>{props.title}</h3>
        
        <img src={props.pic} alt={props.title}></img>
      </div>
    </main>
  );
};

export default Content;
