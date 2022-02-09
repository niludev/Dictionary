import React, { useEffect, useState } from 'react';
import data from "./data.json"
import './App.css';


function App() {
  const [searchedFor, setSearchedFor] = useState(null)
  const [Results, setResults] = useState([])

  useEffect(() => {
    if (searchedFor !== "") {
      const filteredWords = data.words.filter((word) => {
        if (word.title.includes(searchedFor)) {
          return true
        }
        return false
      }).map((word) => {
        return <li><b>{word.title}:</b> {word.meaning}</li>
      })

      setResults(filteredWords)
    }
  }, [searchedFor])

  return (
    <div className="App">
        <h1>This is a personal dictionary</h1>
        <div className="container">

          <div className='item'>
            <p>type your word here:</p>
            <input onChange={(event) => { setSearchedFor(event.target.value) }} />
            <p>The meaning of your word:</p>
            <ul>
              {Results}
            </ul>
          </div>

          <div className='item'>
            <p>Type your new learned word here:</p>
            <input type='text' />
            <p>Type the meaning of your word here:</p>
            <input type='text' />
            <button>Add</button>
          </div>
        </div>
    </div>
  )
}

export default App;
