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
      fetchUserFavourites(response.data.id); // Call fetchUserFavourites after setting the user data
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
    setFavourite(response.data);
    console.log(userId + " in favs");
  } catch (error) {
    setError(error.message);
  }
};


const unmarkProduct = async (id) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  try {
  const response = await axios.delete(
  `http://localhost:8080/api/products/unmark/${id}`,
  {},
  {
  headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,  
  windows: 'true',
  },
  }
  );
  // console.log(response.data)
  setFavourite(favourite.filter((favourite) => favourite.id !== id));
  } catch (error) {
    setError(error.message)
  }
  };

if (error) {
  return <div>{`Error: ${error} `}</div>;
}



  return (
    <>
    <div className='container'>
        <h3>My List Of Marked Products</h3>
        <Link className='btn btn-outline-danger mx-2' to={"/products"}>Back To Products</Link>
                  
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Name</th>
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
                {/* <td>{favourite.user.roles[0].name}</td> */}
                <td>
                  {/* <Link className='btn btn-primary mx-2' to={`/viewuser/${product.id}`}>
                    Mark as Favourite
                  </Link> */}
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

export default ViewMarked;