import React, { useState } from 'react'
import {data} from "../data"
import './App.css'

function App() {

  const [gifts, setGifts] = useState(data)

  let newGift: string;

  const handleSubmit = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setGifts([
      ...gifts,
        {
          id: gifts.length +1,
          title: newGift,
        }
      ]
    ) 

  }
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {

    newGift = evt.currentTarget.value
    
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <ul>
        {
          gifts.map(gift => (
            <li key={gift.id}>
              {gift.title}
            </li>
          ))
        }
      </ul> 
      <form onSubmit={handleSubmit}>
        <label htmlFor='addGift'></label>
        <input 
          id="addGift" 
          type="text"
          onChange ={handleChange}
          placeholder='Add a new gift ...'
         />
         <button 
          type="button" 
          //onClick={handleClick}
          >Add
          </button>
      </form>
    </div>
  )
}

export default App
