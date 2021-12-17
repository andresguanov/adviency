import { constants } from '../constants';
import { Form } from '../Form';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import './App.css'
//import { getGifts } from '../services/getGifts';

function App() {
  const [gifts, setGifts] = useLocalStorage("GIFTS_V1", [])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [editGift, setEditGift] = useState("")

  const { URLdefault } = constants

  // useEffect(() => {
  //   getGifts(url).then(data => {
  //     setGifts(data)
  //     setLoading(false)
  //   })

  // }, [])

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
      {!loading && <button type="button"
        onClick={() => setModal(modal => !modal)}
        className="button--deleted button--deleted__all"
      >Agregar regalo
      </button>}
      <ul className='ListGifts'>
        {!gifts.length && <p>Agrega tus regalos ... </p>}
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
        {loading
          ? (<h4>Espera, Santa está revisando tus regalos ...</h4>)

          : (gifts.map(gift => (
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
                    {gift.total > 1 && `(${gift.total})`}
                    {` - $${gift?.price
                        ? (gift?.price * gift?.total).toFixed(2)
                        : 0}`
                    }
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

          )))
        }
      </ul>
      {(!!gifts.length && !loading) &&
        <button onClick={handleDeleteAll}
          className="button--deleted button--deleted__all"
        >Borrar Todo
        </button>}
    </div>
  )
}

export default App
