import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ViewUser from './users/ViewUser';
import Register from './form/Register';
import Signin from './form/SignIn';
import AddProduct from "./product/AddProduct";
import Products from './product/Products';
import Favourites from './product/Favourites';
import AddPromo from './promo/AddPromo';
import ViewMarked from './promo/ViewMarked';
import EditUser from './users/EditUser';
import ShoppingCart from './product/ShoppingCart';

function App() {


  
  return (
    <div className="App">

      <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/api/auth/signup" element={<Register />} />
        <Route exact path="/api/auth/signin" element={<Signin />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
        <Route exact path="/viewuser/:id" element={<ViewUser />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/favourites" element={<Favourites />} />
        <Route exact path="/addPromoCode" element={<AddPromo />} />
        <Route exact path='/myfavourites' element={<ViewMarked />} />
        <Route exact path='/shoppingcart' element={<ShoppingCart />} />

      </Routes>

      </Router>
      
    </div>
  );
}

export default App;
