
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

function Products() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/view', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      setProducts(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);



  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });

      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
    navigate('/products');
  };

  const markProduct = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/mark/${productId}/${user.id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      setProducts(prevProducts => {
        return prevProducts.map(product => {
          if (product.id === productId) {
            return response.data;
          }
          return product;
        });
      });
    } catch (error) {
      setError('Cannot mark a product twice. Please refresh the page.');
    }
    navigate('/myfavourites');
  };


  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/addtocart/${productId}/${user.id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      setProducts(prevProducts => {
        return prevProducts.map(product => {
          if (product.id === productId) {
            return response.data;
          }
          return product;
        });
      });
    } catch (error) {
      setError('Cannot add a product twice. Please refresh the page.');
    }
    navigate('/shoppingcart');
  };



  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <>
      <div className='container'>

        
        <h5>To Create a Product, You Must Be An Admin</h5>
        <h5>To View All Marked Product, You Must Be An Admin</h5>
        <Link className='btn btn-primary mx-2' to='/addproduct'>
          Add A New Product
        </Link>


        <Link className='btn btn-danger mx-2' to='/favourites'>
          View All Marked Favourites
        </Link>
        {console.log(user)}


        <Link className='btn btn-info mx-2' to='/myfavourites'>
          View My Marked Favourites
        </Link>
        <Link className='btn btn-danger mx-2' to='/shoppingcart'>
          My Shopping Cart
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
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                  <button
                      className='btn btn-primary mx-2'
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className='btn btn-primary mx-2'
                      onClick={() => markProduct(product.id)}
                    >
                      Mark as Favourite
                    </button>
                    <button
                      className='btn btn-danger mx-2'
                      onClick={() => deleteProduct(product.id)}
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
