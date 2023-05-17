import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

export default function Signin() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        usernameOrEmail: "",
        password: ""
    })
    const { usernameOrEmail, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // const onSubmit =async (e) => {
    //     e.preventDefault();
    //     await axios.post("http://localhost:8080/api/auth/signin", user)
    //     navigate("/")
    // }
    // const [token, setToken] = useState('');
    

    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
            usernameOrEmail: usernameOrEmail,
          password: password,
        });
        const token = response.data.accessToken; // Assuming the token is returned in the response as 'accessToken'
        // setToken(token); // Set the token to the state variable
        localStorage.setItem('accessToken', token);
        const headers = new Headers({
            'Content-Type': 'application/json',
        })
        
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
    
        const defaults = {headers: headers};
        event = Object.assign({}, defaults, event);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
  

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post("http://localhost:8080/api/auth/signin", user);
    //         localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
    //         console.log(localStorage.setItem("ACCESS_TOKEN", response.data.accessToken));
    //         navigate("/");
    //     } catch (error) {
    //         console.log(error + "Error");
    //     }
    // };
    


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Sign In</h2>
                    <form onSubmit={(e)=> onSubmit(e)}>
                    

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Username/E-mail
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Username'
                                name='usernameOrEmail'
                                value={usernameOrEmail}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Password
                            </label>
                            <input
                                type={"password"}
                                className='form-control'
                                placeholder='Enter Password '
                                name='password'
                                value={password} // comes from ==> const {name, username, email} = user;
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-info'>Sign In</button>
                        
                        <Link className='btn btn-outline-danger mx-2' to={"/api/auth/signup"}>Register</Link>
                        {/* {token && <p>Token: {token}</p>} Display the token */}
                    </form>
                </div>
            </div>

        </div>
    )
}
