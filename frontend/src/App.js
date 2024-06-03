import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Trending Stocks</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
