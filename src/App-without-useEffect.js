import React, { useState } from 'react';
import './App.css';
import data from "./data.json"

function App() {

  const [searchedFor, setSearchedFor] = useState("")

  return (
    <div className="App">
      <h1>This is a personal dictionary</h1>
      <div className="container">

        <div className='item'>
          <p>type your word here:</p>
          <input onChange={(e) => { setSearchedFor(e.target.value) }} />
          <button>Search</button>
          <p>The meaning of your word:</p>
          <ul>{searchedFor !== "" && data.words.filter((word) => {
            if (
              word.title.toLowerCase().includes(searchedFor.toLowerCase())
            ) {
              return true
            }
            return false
          }).map((word) => {
            return <li><b>{word.title}:</b> {word.meaning}</li>
          })}</ul>
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
