import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <h2>Blog app</h2>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding}to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />}/>
        <Route path="/users/:id" element={<User />}/>
        <Route path="/blogs/:id" element={<Blog />}/>
      </Routes>

    </Router>
  )
}

export default App

/*

*/