import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddPromo() {
    let navigate = useNavigate();

    const [error, setError] = useState(null);
    const [promo, setPromo] = useState({
        code: "",
        promoAmount: ""
    })
    const { code, promoAmount } = promo;

    const onInputChange = (e) => {
        setPromo({ ...promo, [e.target.name]: e.target.value })
    }

    

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8080/api/products/addPromoCode", {
            code: code,
            promoAmount: promoAmount
        }, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
            }
            ,
        });
        console.log(response.data)
        setPromo(response.data);
        } catch (error) {
        console.log(error + " ERROR!!!");
        setError(error.message);
      }
      navigate("/products")
    };
  


    


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Create PromoCode</h2>
                    <form onSubmit={(e)=> onSubmit(e)}>
                    

                        <div className='mb-3'>
                            <label htmlFor='PromoCode' className='form-label'>
                                Promocode
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Promocode'
                                name='code'
                                value={code}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='PromoAmount' className='form-label'>
                                Bonus Amount
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Enter Bonus Amount '
                                name='promoAmount'
                                value={promoAmount} 
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-info'>Create</button>
                        
                        <Link className='btn btn-outline-danger mx-2' to={"/products"}>Cancel</Link>
                        {/* {token && <p>Token: {token}</p>} Display the token */}
                    </form>
                </div>
            </div>

        </div>
    )
}
