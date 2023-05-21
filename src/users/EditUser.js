import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const {id} = useParams()

    useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`, {

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response.data)
          setUser(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchUser();
    }, []);

    const { name, username, email, mobile } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

    const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/users/update/${id}`, {
        name: name,
        username: username,
        email: email,
        mobile: mobile},
        {headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response)
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
    navigate("/")
  }


  return (
    <>
    <div className='container'>
       <div className='row'>
         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
           <h2 className='text-center m-4'>Edit User</h2>
           <form onSubmit={(e) => onSubmit(e)}>
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
              <label htmlFor='Name' className='form-label'>
                Mobile
              </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter Mobile Number'
                name='mobile'
                value={mobile}
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
            <button type='submit' className='btn btn-outline-info'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
          </form>
        </div>


      </div>

    </div>

    </>
  )
}


// function EditUser() {
//   const [error, setError] = useState(null);
//   let navigate = useNavigate();
//   const [user, setUser] = useState([]);
// //   const {id} = useParams()
//   useEffect(() => {
//     const fetchUser = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//               windows: 'true',
//             },
//           });
//           console.log(response.data)
//           setUser(response.data);
//         } catch (error) {
//           setError(error.message);
//         }
//       };
  
//       fetchUser();
//     }, []);
//   const { name, username, email, mobile } = user;

//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }



//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8080/api/users/update/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           windows: 'true',
//         },
//       });
//       console.log(response)
//       setUsers(response.data);
//     } catch (error) {
//       setError(error.message);
//     }
//     navigate("/")
//   }


//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//           <h2 className='text-center m-4'>Edit User</h2>
//           <form onSubmit={(e) => onSubmit(e)}>
//             <div className='mb-3'>
//               <label htmlFor='Name' className='form-label'>
//                 Name
//               </label>
//               <input
//                 type={"text"}
//                 className='form-control'
//                 placeholder='Enter Full Name'
//                 name='name'
//                 value={name}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='Name' className='form-label'>
//                 Username
//               </label>
//               <input
//                 type={"text"}
//                 className='form-control'
//                 placeholder='Enter Username'
//                 name='username'
//                 value={username}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='Name' className='form-label'>
//                 Mobile
//               </label>
//               <input
//                 type={"text"}
//                 className='form-control'
//                 placeholder='Enter Mobile Number'
//                 name='mobile'
//                 value={mobile}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='Email' className='form-label'>
//                 Email
//               </label>
//               <input
//                 type={"email"}
//                 className='form-control'
//                 placeholder='Enter Email '
//                 name='email'
//                 value={email} // comes from ==> const {name, username, email} = user;
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <button type='submit' className='btn btn-outline-info'>Submit</button>
//             <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
//           </form>
//         </div>


//       </div>

//     </div>
//   )
// }

// export default EditUser