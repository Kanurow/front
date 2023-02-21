// api.js
// export const API_URL = "http://localhost:8080/users";

// Table.js
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from "axios";
import { API_URL } from "./api";

function Table({ user, index }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    const result = await axios.get(API_URL);
    setUsers(result.data);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = useCallback(async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    loadUsers();
    navigate("/");
  }, [loadUsers, navigate]);

  const memoizedRow = useMemo(() => {
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>
          <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
          <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
          <button className='btn btn-danger mx-2' onClick={() => { deleteUser(user.id) }}>Delete</button>
        </td>
      </tr>
    );
  }, [index, user, deleteUser]);

  return memoizedRow;
}

export default Table;