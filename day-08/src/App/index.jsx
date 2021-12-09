import { useState } from 'react'
import './App.css'

function App() {
  const [gifts, setGifts] = useState([])

  let newGift; 
  let newGiftTotal;

  const handleSubmit = (evt) => {
    evt.preventDefault()
    


      setGifts(
        [
          ...gifts,
          { 
            id: gifts.length +1,
            title: newGift,
            total: newGiftTotal,
          }
        ]
      )


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

  const handleTotal = (evt) => {
    newGiftTotal = evt.target.value
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newGift"></label>
        <input 
          className = "newGift--input"
          type="text" 
          id="newGift"
          placeholder='Agrega tu regalo...'
          onChange={handleChange}

          
          />
          <input className="totalGift" type="number" onChange = {handleTotal} min={1} />
        <button type='button' onClick={handleSubmit}>Añadir</button>
      </form>
      <ul className='ListGifts'>
      
        {!gifts.length && <p>Agrega tus regalos ... </p>}
        {
          gifts.map(gift => (
              <li key={gift.id}>
                <span>
                  {gift.title}
                  {"         "}
                  {gift.total>1 && `X${gift.total}`}</span>
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
