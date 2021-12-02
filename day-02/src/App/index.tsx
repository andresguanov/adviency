import './App.css'
import { data } from '../data'

function App() {

  return (
    <div className="App">
      <h1>Regalos:</h1>
      
      <ul>
        {
          data.map(article => (
            <li key={article.id}>
              {article.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
