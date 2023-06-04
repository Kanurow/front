import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);


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
          setUser(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
    fetchUser();

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/transactionhistory/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setTransactions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Transaction History</h1>
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Transaction Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.sender.name}</td>
              <td>{transaction.receiver.name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transactionTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
