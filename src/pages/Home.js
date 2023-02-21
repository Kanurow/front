import React, { useEffect, useState } from 'react'
import axios from "axios"

import Table from './Table'
import { Link, useParams } from 'react-router-dom'






export default function Home() {


    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, [])


    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data)
    }



    return (
        <div className='container'>
            <div className='py-4'>

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {users.map((user, index) => (
                            <Table key={index} index={index} user={user} />
                        ))}
                        


                        {/* {
                            users.map((user, index) => {
                                <tr>
                                    <th scope="row" key={index}>{index + 1}kk</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                </tr>
                            })
                         } */}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
