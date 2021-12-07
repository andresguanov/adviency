import { useState } from 'react'
import './App.css'

function App() {
  const [gifts, setGifts] = useState([])

  let newGift;

  const handleSubmit = (evt) => {
    evt.preventDefault()
    
    if(!!newGift && !gifts.some(gift => gift.title ===newGift)){

      setGifts(
        [
          ...gifts,
          { 
            id: gifts.length +1,
            title: newGift
          }
        ]
      )


    }

  }

  const handleChange = (evt) => {
    newGift = evt.target.value.trim()
  }

  const handleDelete = (giftDeleted) => {
    setGifts(gifts.filter(gift => gift.id !== giftDeleted.id))
  }

  const handleDeleteAll = () => {
    setGifts([])
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
      
        {!gifts.length && <p>Agrega tus regalos ... </p>}
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
      {!!gifts.length && 
          <button onClick={handleDeleteAll} 
                  class="button--deleted button--deleted__all"
          >Borrar Todo
          </button>}
    </div>
  )
}

export default App
