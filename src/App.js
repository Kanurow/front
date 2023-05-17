import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import AddUser from './users/AddUser';
// import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import Register from './form/Register';
import Signin from './form/SignIn';
import AddProduct from "./product/AddProduct";
import Products from './product/Products';
import Favourites from './product/Favourites';
import AddPromo from './promo/AddPromo';

function App() {




  
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/api/auth/signup" element={<Register />} />
        <Route exact path="/api/auth/signin" element={<Signin />} />
        {/* <Route exact path='/adduser' element={<AddUser />} /> */}
        {/* <Route exact path="/edituser/:id" element={<EditUser />} /> */}
        <Route exact path="/viewuser/:id" element={<ViewUser />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/favourites" element={<Favourites />} />
        <Route exact path="/addPromoCode" element={<AddPromo />} />

      </Routes>

      </Router>
      
    </div>
  );
}

export default App;
