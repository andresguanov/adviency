import { useState } from 'react'
import { data } from '../data/data'
import './App.css'

function App() {
  const [gifts, setGifts] = useState(data)

  let newGift;

  const handleSubmit = (evt) => {
    evt.preventDefault()
    newGift && setGifts(
      [
        ...gifts,
        { 
          id: gifts.length +1,
          title: newGift
        }
      ]
    )
  

  }

  const handleChange = (evt) => {
    
    newGift = evt.target.value
  }

  const handleDelete = (giftDeleted) => {
    setGifts(gifts.filter(gift => gift.id !== giftDeleted.id))
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newGift"></label>
        <input 
          type="text" 
          id="newGift"
          placeholder='Agrega tu regalo...'
          onChange={handleChange}

          
          />
        <button type='button' onClick={handleSubmit}>Añadir</button>
      </form>
      <ul className='ListGifts'>
        {
          gifts.map(gift => (
              <li key={gift.id}>
                <span>{gift.title}</span>
                <button 
                  className="button--deleted" type='button'
                  onClick={() => handleDelete(gift)}
                  >X</button>
              </li>
              
          ))
        }
      </ul>
    </div>
  )
}

export default App
