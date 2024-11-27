import { useState } from "react";
import "./App.css";
import Movies from './components/Movies.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Movies App</h1>
      <Movies />
    </>
  );
}

export default App;
