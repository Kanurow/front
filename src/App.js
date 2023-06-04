

import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewUser from './users/ViewUser';
import Register from './form/Register';
import Signin from './form/SignIn';
import AddProduct from './product/AddProduct';
import Products from './product/Products';
import Favourites from './product/Favourites';
import AddPromo from './promo/AddPromo';
import ViewMarked from './promo/ViewMarked';
import EditUser from './users/EditUser';
import ShoppingCart from './product/ShoppingCart';
import DepositIntoAccount from './users/DepositIntoAccount';
import Checkout from './product/Checkout';
import CheckoutItems from './product/CheckoutItems ';
import TransferToUser from './users/TransferToUser';
import TransactionHistory from './users/TransactionHistory';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/api/auth/signup" element={<Register />} />
          <Route exact path="/api/auth/signin" element={<Signin />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/favourites" element={<Favourites />} />
          <Route exact path="/addPromoCode" element={<AddPromo />} />
          <Route exact path="/myfavourites" element={<ViewMarked />} />
          <Route exact path='/deposit' element={<DepositIntoAccount />} />
          <Route exact path="/shoppingcart" element={<ShoppingCart />} />
          <Route exact path="/checkedout" element={<CheckoutItems />} />
          <Route exact path="/transfer" element={<TransferToUser />} />
          <Route exact path="/transferhistory" element={<TransactionHistory />} />
          <Route
            exact
            path="/checkout"
            element={
              <Checkout />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
