
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';

function ShoppingCart() {



  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

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
        fetchUserShoppingCart(response.data.id);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserShoppingCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/cart/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      const cartWithData = response.data.map((cart) => ({
        ...cart,
        quantity: 0, // Initialize quantity to 0
      }));
      console.log(cartWithData)

      setCart(cartWithData);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeItem = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:8080/api/products/removefromcart/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          windows: 'true',
        },
      });
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error); // Log the error object for debugging
      setError(error.message);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const maxQuantity = cart[index].product.quantity;
    if (newQuantity < 0) {
      return;
    }
    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }


  return (
    <>
      <div className="container">
        <h3>Shopping Cart</h3>
        <Link className="btn btn-outline-danger mx-2" to="/products">
          Back To Products
        </Link>
        <Link className="btn shopping-cart-btn">
          <GiShoppingBag size={30} />
          {cart.length > 0 && <span className="product-count">{cart.length}</span>}
        </Link>

        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Available Quantity</th>
                <th scope="col">Unit Total Cost</th>
                <th scope="col">Quantity Ordered</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.product.productName}</td>
                  <td>{item.product.price}</td>
                  <td>{item.product.quantity}</td>
                  <td>{item.product.price * item.quantity}</td>
                  <td>
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                  </td>
                  <td>
                    <button className="btn btn-danger mx-2" onClick={() => removeItem(item.id)}>
                      removeItem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>

      <div className="btn btn-outline-secondary mx-2"> Shopping Total Cost: #{calculateTotal()}</div>
      <div className="btn btn-outline-dark mx-2"> Check Out</div>

    </>
  );
}

export default ShoppingCart;
