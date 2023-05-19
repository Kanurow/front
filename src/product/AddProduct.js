import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddProduct() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const [product, setProduct] = useState({
        productName: "",
        price: "",
        quantity: ""

    })
    const { productName, price, quantity} = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const onSubmit =async (e) => {
        e.preventDefault();
        // await axios.post("http://localhost:8080/api/products/create", product);
        console.log("HERE " + product)
        submitProduct(e);
        // deleteUser(e);
        
        
    }

    

    
    const submitProduct = async (e) => {
        try {
        const response = await axios.post("http://localhost:8080/api/products/create", {
            productName: productName,
            price: price,
            quantity: quantity
        }, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
            }
            ,
        });
        console.log(response.data)
        setProduct(response.data);
        navigate("/products");
        } catch (error) {
        console.log(error + " ERROR");
        setError(error.message);
      }


    };





    const deleteUser = async (e) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("accessToken " +accessToken);
        try {
          const response = await axios.post("http://localhost:8080/api/products/create", {
            productName: productName,
            price: price,
            quantity: quantity,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response.data);
          setProduct(response.data);
        } catch (error) {
          setError(error.message);
        }
      };





      

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Create Product</h2>
                    <form onSubmit={(e)=> onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Product Name
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Name of Product'
                                name='productName'
                                value={productName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Quantity' className='form-label'>
                                Quantity
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Enter Quantity'
                                name='quantity'
                                value={quantity}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Price' className='form-label'>
                                Price
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Enter Price of Product '
                                name='price'
                                value={price} 
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type='submit' className='btn btn-outline-info'>Add Product</button>
                        <Link className='btn btn-outline-danger mx-2' to={"/products"}>Cancel</Link>
                    </form>
                </div>
            </div>

        </div>
    )
}








// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [product, setProduct] = useState({
//     productName: '',
//     price: '',
//     quantity: '',
//   });

//   const { productName, price, quantity } = product;

//   const onInputChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/products/create',
//         {
//           productName: productName,
//           price: price,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             windows: 'true',
//           },
//         }
//       );
//       navigate('/products', { state: { newProduct: response.data } });
//     } catch (error) {
//       console.log(error + ' ERROR');
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//           <h2 className='text-center m-4'>Create Product</h2>
//           <form onSubmit={(e) => onSubmit(e)}>
//             <div className='mb-3'>
//               <label htmlFor='Name' className='form-label'>
//                 Product Name
//               </label>
//               <input
//                 type={'text'}
//                 className='form-control'
//                 placeholder='Enter Name of Product'
//                 name='productName'
//                 value={productName}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='Quantity' className='form-label'>
//                 Quantity
//               </label>
//               <input
//                 type={'number'}
//                 className='form-control'
//                 placeholder='Enter Quantity'
//                 name='quantity'
//                 value={quantity}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='Price' className='form-label'>
//                 Price
//               </label>
//               <input
//                 type={'number'}
//                 className='form-control'
//                 placeholder='Enter Price of Product '
//                 name='price'
//                 value={price}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <button type='submit' className='btn btn-outline-info'>
//               Add Product
//             </button>
//             <Link className='btn btn-outline-danger mx-2' to={'/products'}>
//               Cancel
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
