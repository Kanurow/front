
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutItems = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
        fetchUserPurchases(response.data.id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserPurchases = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/checkedout/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });

      setCart(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Checked Out Items</h2>
      {cart.map((checkout, index) => (
        <div key={index}>
          <h4>Order {index + 1}</h4>
          <p>Shipped To: {checkout.orderAddress}</p>
          <p>Total: ${checkout.price}</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {checkout.cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      ))}
      <Link className='btn btn-outline-danger mx-2' to={"/"}>Back To Home</Link>
    </div>
  );
};

export default CheckoutItems;
