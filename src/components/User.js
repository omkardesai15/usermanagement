import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { setMessageFunc} from './Modal'
//import { useLocation } from 'react-router-dom'

const User = (props) => {
  var row = 1
 // const location = useLocation()



  const [result, setResult] = useState([])
  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUser()
      setResult(userFromServer)
    }
    getUser()
  }, [])

  //Fetch User
  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/user')
    const data = await res.json()
    return data
  }

  //Delete User
  const deleteUser = async id => {
    try {
      await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: 'DELETE'
      })

      setResult(result.filter(user => user._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  //Edit User

  /* const EditUser = async (id,data)  => {
    try {
      const res =await fetch(`http://localhost:5000/user/update/${id}`,{
        method: 'POST'
      })

      const data = res.json()
      console.log(data);

      return data;

    } catch (error) {
      console.log(error);
    }
  } */

 // console.log(result)

  return (
    <div>
      <table className='table'>
        <thead align='center'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>UserName</th>
            <th scope='col'>Company Name</th>
            <th scope='col'>Age</th>
            <th scope='col'>Date Of Birth</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>

        <tbody align='center'>
          {result.map((result, index) => (
            <tr key={index}>
              <td>{row++}</td>
              <td>{result.username}</td>
              <td>{result.companyname}</td>
              <td>{result.age}</td>
              <td>{dayjs(result.dateofbirth).format('DD MMM YYYY')}</td>
              <td>
                  {/* Button trigger modal */}
                  <>
                  <button
                    type='button'
                    className='btn btn-primary'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal' 
                    onClick = {() => {
                      setMessageFunc(result);
                    }}     
                  >
                    Edit
                  </button>
                  {/* Modal 
                   <Modal show={true} message={"Edit User"}/> */} 
                  </>
                {' '}
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => deleteUser(result._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
