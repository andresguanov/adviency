import { constants } from '../constants';
import { Form } from '../Form';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';
import { Modal } from '../Modal';
import './App.css'

function App() {
  const [gifts, setGifts] = useLocalStorage("GIFTS_V1", [])
  const [modal, setModal] = useState(false)
  const [editGift, setEditGift] = useState("")

  const { URLdefault } = constants
  console.log(gifts)

  const handleDelete = (giftDeleted) => {
    setGifts(gifts.filter(gift => gift.id !== giftDeleted.id))
  }

  const handleDeleteAll = () => {
    setGifts([])
  }

  const handleEdit = editGift => {
    setEditGift(editGift)
    setModal(modal => !modal)
  }

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <button type="button"
        onClick={() => setModal(modal => !modal)}
        className="button--deleted button--deleted__all"
      >Agregar regalo
      </button>
      {modal &&
        <Modal>
          <Form
            gifts={gifts}
            setGifts={setGifts}
            setModal={setModal}
            editGift={editGift}
            setEditGift={setEditGift}
          />
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
                  src={gift?.URL || URLdefault}
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
              <div className='ListGifts--buttons'>
                <button
                  className="button--deleted" type='button'
                  onClick={() => handleEdit(gift)}
                >
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button
                  className="button--deleted" type='button'
                  onClick={() => handleDelete(gift)}
                >
                  <ion-icon name="trash-outline">
                  </ion-icon></button>

              </div>
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
