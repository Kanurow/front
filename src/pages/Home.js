import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDateTime } from "../utils/Helpers";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/user/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
    fetchUser();
  }, []);


  const deleteUser = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken " +accessToken);
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response.data);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  


  if (error) {
    return <div style={{color: "red"}}>
    Something Went Wrong! Reload page or Sign into your account!
    </div>;
  }


  return (

    <>

    <div className='container'>
        <h3>Hi, {user.username} To Delete A User You Must Be An Admin</h3>
        <p>PS: Deleting yourself will lead to signing up again.</p>
        <p>PS: To create an admin account, while registering. add "row" to your email.</p>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Full Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Username</th>
              <th scope='col'>Role</th>
              <th scope='col'>Joined On</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.roles[0].name}</td>
                <td>{formatDateTime(user.createdAt)}</td>
                <td>
                  <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    

    </>
  );
}





