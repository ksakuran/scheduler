import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (secondary, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), secondary]);
    } else {
      setHistory((prev) => {
        return [...prev, secondary];
      });
    }
    setMode(secondary);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
      const prevMode = history[history.length - 2]
      setMode(prevMode);
    }
    if (history.length === 1) {
      setMode(initial);
    }
  };
  return { mode, transition, back };
};

export default useVisualMode;