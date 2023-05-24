import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Favourites() {


  const [error, setError] = useState(null);
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/favourites', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      setFavourite(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  fetchUsers();
}, []);





  const unmarkProduct = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:8080/api/products/unmark/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });
      setFavourite((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
    } catch (error) {
      console.error(error); // Log the error object for debugging
      setError(error.message);
    }
  };






if (error) {
  return <div>{`Error: ${error} `}</div>;
}



  return (
    <>
    <div className='container'>
        <h3>List Of All Marked Products</h3>
        <Link className='btn shopping-cart-btn'>
          { favourite.length > 0 && <span className='product-count'> Total Marked Products:  {favourite.length}</span>}
        </Link>
        

          <Link className='btn btn-outline-danger mx-2' to={"/products"}>Back To Products</Link>
          <Link className='btn btn-outline-info mx-2' to={"/myfavourites"}>View My Marked Favourites</Link>
                  
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Marked By</th>
              <th scope='col'>Action</th>

            </tr>
          </thead>
          <tbody>
            {favourite.map((favourite, index) => (
              <tr key={favourite.id}>
                <th scope='row'>{index + 1}</th>
                <td>{favourite.product.productName}</td>
                <td>{favourite.product.price}</td>
                <td>{favourite.product.quantity}</td>
                <td>{favourite.user.name}</td>
                <td>
                
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => {
                      unmarkProduct(favourite.id);
                    }}
                  >
                    UnMark
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

export default Favourites;
