import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
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
        console.log(response.data)
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

  const markProduct = async (e) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/products/mark/${e}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response.data)
      // setProduct(response.data);
    } catch (error) {
      setError(" CANNOT MARK TWICE: Refresh page");
    }
  };

  if (error) {
    return <div>{`Error: ${error} `}</div>;
  }

  // Check if `product` is an array before using the `map()` method
  // if (!Array.isArray(product)) {
  //   console.log("WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
  //   // return <div>Loading...</div>;
  // }

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
                <th scope='col'>Available Quantity</th>
                <th scope='col'>Price</th>
                
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              
              {Object.entries(product).map((product, index) => (
                <tr key={product.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{product[1].productName}</td>
                  <td>{product[1].quantity}</td>
                  <td>{product[1].price}</td>
                  <td>
                    <button
                      className='btn btn-primary mx-2'
                      onClick={() => {
                        markProduct(product[1].id);
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
  );
}

export default Products;
