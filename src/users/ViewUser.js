import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {
    const [error, setError] = useState(null);

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


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            USERS PROFILE
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {users.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Username: </b>
                                    {users.username}
                                </li>
                                <li className='list-group-item'>
                                    <b>E-mail: </b>
                                    {users.email}
                                </li>
                                <li className='list-group-item'>
                                    <b>voucher Balance: </b>
                                    {users.voucherBalance || "No Voucher Available"}
                                </li>
                                <li className='list-group-item'>
                                    <b>Account Balance: #</b>
                                    {users.accountBalance || "0"}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
