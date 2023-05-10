import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {


    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState([]);

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/view', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        console.log(response)
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  // const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`);
  //     console.log(response);
  //     setUsers(users.filter((user) => user.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //         windows: 'true',
  //       },
  //     });
  //     console.log(response.data)
  //     setUsers(response.data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }

  const deleteUser = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken " +accessToken);
    try {
      const response = await axios.post(`http://localhost:8080/api/products/mark/${id}`, {
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
    return <div>{`Error: ${error} `}</div>;
  }


  return (
    <>

<div className='container'>
        <h3>To Create a Product, You Must Be An Admin</h3>
        <Link className='btn btn-primary mx-2' to={'/addproduct'}>
                    Add A New Product
                  </Link>
                  <Link className='btn btn-danger mx-2' to={'/favourites'}>
                    View Favourites
                  </Link>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Available Quantity</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product, index) => (
              <tr key={product.id}>
                <th scope='row'>{index + 1}</th>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  {/* <Link className='btn btn-primary mx-2' to={`/viewuser/${product.id}`}>
                    Mark as Favourite
                  </Link> */}
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => {
                      deleteUser(product.id);
                    }}
                  >
                    Mark as Favourite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    
    </>
  )
}

export default Products