import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';
import { Modal } from '../Modal';
import './App.css'

function App() {
  const [gifts, setGifts] = useLocalStorage("GIFTS_V1", [])
  const [modal, setModal] = useState(false)

  let newGift, newGiftTotal = 1, newGiftDestiny;
  const URLdefault = 'https://static.vecteezy.com/system/resources/previews/002/205/948/non_2x/gift-box-icon-free-vector.jpg'
  const id = gifts[gifts.length - 1]?.id ?? -1

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const URL = evt.target.url.value
    console.log(URL)

    setGifts(
      [
        ...gifts,
        {
          id: id + 1,
          title: newGift,
          destiny: newGiftDestiny,
          total: newGiftTotal,
          URL,

        }
      ]
    )

    modal && setModal(false)

  }

  const handleChangeGift = (evt) => {
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

  const handleDestiny = (evt) => {
    newGiftDestiny = evt.target.value
  }

  const handleModal = () => {
    setModal(modal => !modal)
    console.log(modal)
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <button type="button"
        onClick={handleModal}
        className="button--deleted button--deleted__all">Agregar regalo</button>
      {modal &&
        <Modal>
          <form onSubmit={handleSubmit}>
            <label htmlFor="newGift"></label>
            <input
              className="newGift--input"
              type="text"
              id="newGift"
              placeholder='Agrega tu regalo...'
              onChange={handleChangeGift}
            />
            <input
              name="url"
              type="url"
              placeholder='http://image...' className="newGift--input" />
            <input
              className="newGift--input"
              placeholder='1'
              name="totalGift"
              type="number"
              onChange={handleTotal}
              min={1}
            />
            <input
              name="destiny"
              type="text"
              placeholder='Destinatario...' className="newGift--input"
              onChange={handleDestiny}
            />
            <div className='buttons'>
              <button
                type='button'
                className="button--deleted"
                onClick={handleModal}
              >Cancelar
              </button>
              <button
                className="add-button"
                type='submit'
              >Añadir
              </button>

            </div>
          </form>


        </Modal>
      }
      <ul className='ListGifts'>
        {!gifts.length && <p>Agrega tus regalos ... </p>}
        {
          gifts.map(gift => (
            <li key={gift.id}>
              <div className='items'>
                <img
                  className="gift-image"
                  src={gift.URL || URLdefault}
                />
                <div className="item">
                  <span>
                    {gift.title}
                    {"       "}
                    {gift.total > 1 && `X${gift.total}`}
                  </span>

                  <span className="item--destiny">
                    {gift?.destiny && `Para: ${gift.destiny}`}
                  </span>
                </div>


              </div>
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
          className="button--deleted button--deleted__all"
        >Borrar Todo
        </button>}
    </div>
  )
}

export default App
