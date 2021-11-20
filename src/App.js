import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './components/Header'
import User from './components/User'

function App () {

  return (
    <Router>
      <div className='container'>
        <Header />

        <Route  path='/' exact render= {props =>(
          <>
            {<User />}
          </>
        )}/>
        
      </div>
    </Router>
  )
}

export default App
