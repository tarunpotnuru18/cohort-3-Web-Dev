import { useState, useEffect } from "react";

import "./App.css";

/* function App() {
  let [isrender, setrender] = useState(true);
  useEffect(function () {
    setInterval(() => {
      setrender((isrender) => !isrender);
    }, 6000);
  }, []);

  return isrender && <Counter></Counter>;
}
function Counter() {
  let [count, setcount] = useState(0);
  useEffect(function () {
    let interval = setInterval(function () {
      setcount((count) => count + 1);
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, []);
  return <h1>{count}</h1>;
} */

function App() {
  const [count, setcount] = useState(0);

  return (
    <div>
      <Counter count={count} setcount={setcount} />
      <button onClick={() => setcount(count + 1)}>Increase</button>
    </div>
  );
}

function Counter(props) {
  useEffect(
    function () {
      console.log("Props updated, sir!");
    },
    [props.count] // Dependency array to watch for changes in props.count
  );

  return <h1>{props.count}</h1>;
}

export default App;
