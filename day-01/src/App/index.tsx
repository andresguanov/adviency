import { data } from '../data'
import './App.css'

function App() {

  return (
    <div className="App">
      <h1>Regalos:</h1>
      <ul>
        {data.map(el => (
          <li key="el.id">{el.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
