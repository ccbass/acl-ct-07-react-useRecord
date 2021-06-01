/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

const useRecord = (init) => {
  const [colorHistory, setColorHistory] = useState([init]);
  const [colorPosition, setColorPosition] = useState(0);
  
  const record = (val) => {
    setColorHistory(prev => [...prev, val]);
  };

  const undo = () => {
    if(colorPosition > 0){
      setColorPosition(prev => prev - 1);
    }
  };

  const redo = () => {
    if(colorPosition < colorHistory.length - 1){
      setColorPosition(prev => prev + 1);
    }
  };

  useEffect(() => {
    setColorPosition(colorHistory.length - 1);
  }, [colorHistory]);


  const current = colorHistory[colorPosition];
  
  return { current, record, undo, redo };


};

function App() {
  const { current, undo, redo, record, } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input type="color" value={current} onChange={({ target }) => record(target.value)} />
      <div style={{ backgroundColor: current, width: '10rem', height: '10rem' }}></div>
    </>
  );
}

export default App;
