import { useLocation } from 'react-router-dom'
import {Modal, setMessageFunc} from './Modal'

const Header = props => {
  const location = useLocation()

  const addUser = async user =>{
    const res = await fetch('http://localhost:5000/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()
    console.log(data);

  }

  return (
    <header className='header'>
      <h1>User Management</h1>
      {location.pathname === '/' && (
        <div className='header'>
          {/* Button trigger modal */}
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
            onClick = {() => {
              setMessageFunc(); 
            }}
          >
            Add User
          </button>
          {/* Modal */}
          <Modal show={true} onAdd={addUser}/>
        </div>
      )}
    </header>
  )
}

export default Header
