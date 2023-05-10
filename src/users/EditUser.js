import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const {id} = useParams()
  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response.data)
          setUsers(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchUsers();
    }, []);
  const { name, username, email, mobile } = users;

  const onInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.put(`http://localhost:8080/user/${id}`, users)
    try {
      const response = await axios.put(`http://localhost:8080/api/users/update/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response)
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
    navigate("/")
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Name
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter Full Name'
                name='name'
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Username
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter Username'
                name='username'
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>
                Mobile
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter Mobile Number'
                name='mobile'
                value={mobile}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='Email' className='form-label'>
                Email
              </label>
              <input
                type={"email"}
                className='form-control'
                placeholder='Enter Email '
                name='email'
                value={email} // comes from ==> const {name, username, email} = user;
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-outline-info'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
          </form>
        </div>


      </div>

    </div>
  )
}

export default EditUser