import AnecdoteForm from "./components/AnecdoteForm"
import Anecdotes from "./components/Anecdotes"
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App