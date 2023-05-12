import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {


    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        password: ""
    })
    const { name, username, email, mobile, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/auth/signup", user);
        navigate("/api/auth/signin");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>
                    <form onSubmit={(e)=> onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Full Name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Username
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Username'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Email
                            </label>
                            <input
                                type={"email"}
                                className='form-control'
                                placeholder='Enter Email '
                                name='email'
                                value={email} // comes from ==> const {name, username, email} = user;
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Mobile
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Enter Mobile Number '
                                name='mobile'
                                value={mobile} // comes from ==> const {name, username, email} = user;
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
                        <button type='submit' className='btn btn-outline-info'>Register</button>
                        <Link className='btn btn-outline-danger mx-2' to={"/api/auth/signin"}>Already have an account? Sign In</Link>
                    </form>
                </div>
            </div>

        </div>
    )
}
