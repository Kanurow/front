import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function TransferToUser() {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);

    const [transferAccount, setTransferAccount] = useState({
        transferAmount: "",
        emailOrAccountNumber: ""
    })

    const { emailOrAccountNumber, transferAmount} = transferAccount;

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
              setCurrentUser(response.data);
            } catch (error) {
              setError(error.message);
            }
          };
  
      fetchUser();
    }, []);


    const onInputChange = (e) => {
        setTransferAccount({ ...transferAccount, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:8080/api/users/transfer/${currentUser.id}`, {
            transferAmount: transferAmount,
            emailOrAccountNumber: emailOrAccountNumber
            },
            {
                headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              windows: 'true',
            },
          });
          console.log(response)
          setCurrentUser(response.data);
          navigate("/")
        } catch (error) {
          setError(error.message);
        }
        
      }


  return (
    <>
        <div className='container'>
       <div className='row'>
         <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
           <h3 className='text-center m-4'>Welcome {currentUser.username}! Make Transfer</h3>
           
           <form onSubmit={(e) => onSubmit(e)}>

             <div className='mb-3'>
               <label htmlFor='emailOrAccountNumber' className='form-label'>
                 Enter Email/Account Number
               </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter Beneficiary email or account number'
                name='emailOrAccountNumber'
                value={emailOrAccountNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
               <label htmlFor='transferAmount' className='form-label'>
                 Enter Amount
               </label>
              <input
                type={"text"}
                className='form-control'
                placeholder='How Much Do You wish To Transfer'
                name='transferAmount'
                value={transferAmount}
                onChange={(e) => onInputChange(e)}
              />
            </div>

    
            <button type='submit' className='btn btn-outline-info'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to={"/"}>Cancel</Link>
            {error && <p className="text-danger">{error} : Check Benefitciary Details/Insufficient Balance</p>}
          </form>
        </div>


      </div>
    </div>
    </>
  )
}

export default TransferToUser