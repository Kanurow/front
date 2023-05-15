import React from 'react';
import { Link } from 'react-router-dom';
// import { ShoppingCart } from "phosphor-react";

export default function Navbar() {


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>E Commerce Demo</Link>
            </div>
            
            <Link className='btn btn-outline-light' to="/api/auth/signup">Add User</Link>
            <Link className='btn btn-outline-light' to="/products">View Products</Link>
            {/* <Link>
            <ShoppingCart size={34} />
            </Link> */}
        </nav>

    </div>
  )
}
