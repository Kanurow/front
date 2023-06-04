import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [orderAddress, setOrderAddress] = useState('');
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const { cart } = location.state;
  
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
    fetchUser();
  }, []);






  const onSubmit = async (e) => {
    e.preventDefault();
    submitCart();
  };

  const submitCart = async () => {

    try {
      const total = calculateTotal();
      const quantity = cart.length;
      const cartData = cart.map((item) => ({
        productName: item.product.productName,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.quantity * item.product.price,
      }));

      const response = await axios.post(
        `http://localhost:8080/api/products/checkout/${user.id}`,
        {
          orderAddress: orderAddress,
          total: total,
          quantity: quantity,
          userId: user.id,
          cart: cartData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        }
      );

      console.log(response.data);
      // setProduct(response.data);
      navigate('/products');
    } catch (error) {
      console.log(error + ' ERROR');
      setError(error.message);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return (
    <>
      <h2>Check Out Cart</h2>

      <form onSubmit={onSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{item.product.productName}</td>
                <td>${item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity * item.product.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"></td>
              <th>Total:</th>
              <th>${calculateTotal()}</th>
            </tr>
          </tfoot>
        </table>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Shipping Address"
          name="orderAddress"
          value={orderAddress}
          onChange={(e) => setOrderAddress(e.target.value)}
        />
        <button className='btn btn-outline-info mx-2' type="submit">Confirm</button>
      </form>
    </>
  );
}

export default Checkout;
