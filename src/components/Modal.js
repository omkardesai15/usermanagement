import React from 'react'
import { useState } from 'react'
import moment from 'moment'
//import User from './User'

let setMessageFunc
const Modal = ({ onAdd }) => {
  
  let [user, setUser] = useState('')
  let [username, setUserName] = useState('')
  let [age, setAge] = useState('')
  let [companyname, setCompanyName] = useState('')
  let [dateofbirth, setDateOfBirth] = useState('')

  setMessageFunc = user => {
    setUser(user || {})
  }

  console.log(user)

  let handleUser = (id, event) => {
    console.log(user)
    console.log(id)

    !user
      ? onAdd({ username, age, companyname, dateofbirth })
      : EditUser(id, event)
  }

  //Edit User

  const EditUser = async (id, data) => {
    try {
      const res = await fetch(`http://localhost:5000/user/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
      })

      const editeduser = res.json()
      console.log(editeduser)

      return editeduser
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='exampleModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      
    >
      <div className='modal-dialog' data-backdrop='static'
      data-keyboard='false'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {(() => {
                if (!user.id) {
                  return 'Add user'
                } else {
                  return 'Edit User'
                }
              })()}
            </h5>
          </div>

          <div className='modal-body'>
            <form onSubmit={handleUser}>
              <div className='mb-3'>
                <label className='form-label'>User Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={user.username}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Company Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={user.companyname}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={e => setCompanyName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Age</label>
                <input
                  type='text'
                  className='form-control'
                  value={user.age}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={e => setAge(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Date of Birth</label>{' '}
                <input
                  type='date'
                  placeholder='dd-mm-yyyy'
                  value={moment(user.dateofbirth).format('YYYY-MM-DD')}
                  min='1901-01-01'
                  max='2030-12-31'
                  onChange={e => setDateOfBirth(e.target.value)}
                />
              </div>
              {(() => {
                if (!user) {
                  return (
                    <button type='submit' className='btn btn-primary'>
                      Add user
                    </button>
                  )
                } else {
                  return (
                    <button type='submit' className='btn btn-primary'>
                      Edit User
                    </button>
                  )
                }
              })()}{' '}
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Modal, setMessageFunc }
