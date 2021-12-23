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
  const [previsualization, setPrevisualization] = useState(false)
  const [editGift, setEditGift] = useState("")
  const [duplicateGift, setDuplicateGift] = useState("")
  const [music, setMusic] = useState("")
  const [paused, setPaused] = useState(true)

  const { URLdefault } = constants

  useEffect(() => {
    const urlMusic = 'https://andresguanov.github.io/assets/christmas.mp3'
    const music = new Audio(urlMusic)
    music.volume = 0.05
    music.loop = true
    setMusic(music)

  }, [])

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

  const handleDuplicate = duplicateGift => {
    setDuplicateGift(duplicateGift)
    setModal(modal => !modal)
  }

  const totalPrice = gifts.reduce((acum, gift) => {
    acum += gift?.price * gift?.total
    return acum
  }, 0)

  const handlePrevisualization = () => {
    setPrevisualization(previsualization => !previsualization)
  }

  const handleMusic = () => {
    if (paused) {

      music.play()
      setPaused(paused => !paused)
    } else {
      music.pause()
      setPaused(paused => !paused)
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Regalos:</h1>
        <button
          className={`music-button ${paused || "music-button__paused"}`}
          onClick={handleMusic}
        >
          {paused
            ? <ion-icon name="volume-high-outline"></ion-icon>
            : <ion-icon name="volume-mute-outline"></ion-icon>

          }

        </button>

      </header>
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
              duplicateGift={duplicateGift}
              setDuplicateGift={setDuplicateGift}
            />
          </Modal>
        }
        {
          previsualization &&
          <Modal>
            <div className='Previsualization ListGifts'>
              <h2>Comprar:</h2>
              <ul>
                {gifts.map(gift => (
                  <li className='items'>
                    <img
                      className='gift-image'
                      src={gift?.URL || URLdefault}
                    />
                    <div className='item'>
                      <span>
                        {gift.title}
                        {"       "}
                        {gift.total > 1 && `(${gift.total})`}
                      </span>
                      <span className="item--destiny">
                        {gift?.destiny && `Para: ${gift.destiny}`}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='Previsualization--buttons'>

                <button
                  className='button--previsualization'
                  onClick={handlePrevisualization}
                  type='button'
                >Cerrar
                </button>
                <button
                  className='button--previsualization button--print'
                  onClick={window.print}
                  type='button'
                >Imprimir
                </button>

              </div>
            </div>
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
                  onClick={() => handleDuplicate(gift)}
                >
                  <ion-icon name="duplicate-outline"></ion-icon>
                </button>
                <button
                  className="button--deleted" type='button'
                  onClick={() => handleDelete(gift)}
                >
                  <ion-icon name="trash-outline">
                  </ion-icon>
                </button>



              </div>
            </li>

          )))
        }
      </ul>
      <div className="TotalPrice">
        Total: ${totalPrice.toFixed(2)}
      </div>
      {
        (!!gifts.length && !loading) &&
        <div className="App-buttons">
          <button onClick={handlePrevisualization}
            className="button--previsualization"
          >Previsualizar
          </button>
          <button onClick={handleDeleteAll}
            className="button--deleted button--deleted__all"
          >Borrar Todo
          </button>
        </div>
      }
    </div>
  )
}

export default App
