import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])
  
  
  function transition(secondary, replace = false) {

    if(replace) {
      history.pop()
      setMode(secondary)
    }

    setHistory(prev => {
      return [...prev, secondary];
    })
    setMode(secondary)
  }
  
  function back() {
    if (history.length > 1){
      history.pop();
      setMode(history[history.length - 1]);
    }
    if (history.length === 1) {
      setMode(initial);
    }
    
  }
  return { mode, transition, back };
}