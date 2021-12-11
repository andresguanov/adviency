import { useLocalStorage } from '../hooks/useLocalStorage';
import './App.css'

function App() {
  const [gifts, setGifts] = useLocalStorage("GIFTS_V1", [])

  let newGift, newGiftTotal = 1
  const URLdefault = 'https://static.vecteezy.com/system/resources/previews/002/205/948/non_2x/gift-box-icon-free-vector.jpg'
  const id = gifts[gifts.length - 1]?.id ?? -1

  console.log(gifts)

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
          total: newGiftTotal,
          URL,
        }
      ]
    )

    evt.target.newGift.value = ""
    evt.target.totalGift.value = ""
    evt.target.url.value = ""

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

  return (
    <div className="App">
      <h1>Regalos:</h1>
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
          className="totalGift"
          placeholder='1'
          name="totalGift"
          type="number"
          onChange={handleTotal}
          min={1}
        />
        <input name="url" type="url" placeholder='http://image...' className="newGift--input" ></input>
        <button type='submit'>Añadir</button>
      </form>
      <ul className='ListGifts'>
        {!gifts.length && <p>Agrega tus regalos ... </p>}
        {
          gifts.map(gift => (
            <li key={gift.id}>
              <img src={gift.URL || URLdefault} />
              <span>
                {gift.title}
                {"         "}
                {gift.total > 1 && `X${gift.total}`}</span>
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
