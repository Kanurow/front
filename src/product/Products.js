import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Products() {
  const [user, setUser] = useState([]);


  


  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);
  let navigate = useNavigate();

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
    const fetchProducts = async () => {
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

    fetchProducts();
    fetchUser();

  }, []);



  console.log(user.id);
  const markProduct = async (e) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/products/mark/${e}/${user.id}`, {
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
    navigate("/favourites");
  };

  if (error) {
    return <div>{`Error: ${error} `}</div>;
  }


  const deleteProduct = async (e) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/products/delete/${e}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response.data)
      // setProduct(response.data);
    } catch (error) {
      setError(" CANNOT DELETE A PRODUCT TWICE: Refresh page");
    }
    navigate("/products");
  };

  return (
    <>
      <div className='container'>
        <h3>To Create a Product, You Must Be An Admin</h3>
        <Link className='btn btn-primary mx-2' to={'/addproduct'}>
          Add A New Product
        </Link>
        <Link className='btn btn-danger mx-2' to={'/favourites'}>
          View All Marked Favourites
        </Link>
        <Link className='btn btn-secondary mx-2' to={'/myfavourites'}>
          View My Marked Favourites
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
                    <button
                      className='btn btn-danger mx-2'
                      onClick={() => {
                        deleteProduct(product[1].id, user.id);
                      }}
                    >
                      Delete Product
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
