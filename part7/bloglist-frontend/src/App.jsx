import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />}/>
          <Route path="/users/:id" element={<User />}/>
          <Route path="/blogs/:id" element={<Blog />}/>
          <Route path="/login" element={<LoginForm />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

/*

*/