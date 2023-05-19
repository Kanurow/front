import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewMarked() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
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
        fetchUserFavourites(response.data.id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserFavourites = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/favourites/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      const favoritesWithData = response.data.map((favorite) => ({
        ...favorite,
        quantity: 0, // Initialize quantity to 0
      }));
      setFavourite(favoritesWithData);
    } catch (error) {
      setError(error.message);
    }
  };

  const unmarkProduct = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:8080/api/products/unmark/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });
      setFavourite((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const maxQuantity = favourite[index].product.quantity;
    if (newQuantity < 0 ) {
      return;
    }
    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    setFavourite((prevFavorites) => {
      const updatedFavorites = [...prevFavorites];
      updatedFavorites[index].quantity = newQuantity;
      return updatedFavorites;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    favourite.forEach((favorite) => {
      total += favorite.product.price * favorite.quantity;
    });
    return total;
  };

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <>
      <div className='container'>
        <h3>My List Of Marked Products</h3>
        <Link className='btn btn-outline-danger mx-2' to='/products'>Back To Products</Link>

        <div className='py-4'>
          <table className='table border shadow'>
            <thead>
              <tr>
                <th scope='col'>S.N</th>
                <th scope='col'>Product Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Available Quantity</th>
                <th scope='col'>Quantity Demanded</th>
                <th scope='col'>Name</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {favourite.map((favorite, index) => (
                <tr key={favorite.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{favorite.product.productName}</td>
                  <td>{favorite.product.price}</td>
                  <td>{favorite.product.quantity}</td>
                  <td>
                    <button onClick={() => updateQuantity(index, favorite.quantity - 1)}>-</button>
                    {favorite.quantity }
                    <button onClick={() => updateQuantity(index, favorite.quantity + 1)}>+</button>
                  </td>
                  <td>{favorite.user.name}</td>
                  <td>
                    <button className='btn btn-danger mx-2' onClick={() => unmarkProduct(favorite.id)}>
                      UnMark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='btn btn-outline-info mx-2' >Total: {calculateTotal()}</div>
    </>
  );
}

export default ViewMarked;
