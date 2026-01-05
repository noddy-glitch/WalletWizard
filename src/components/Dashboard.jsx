import React from 'react';
import '../style/Dashboard.css';
import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ transactions }) => {
  const currentuser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentuser,"currentuser");

  console.log(currentuser.id);
  



  const transactiondata = JSON.parse(localStorage.getItem("transactions")) || [];
  
  const i = transactiondata.filter(t => t.userId == transactiondata.userId);
  const o = i.filter(t => t.type === "Income");
  const n =  o.reduce((acc, curr) => acc + curr.amount, 0)


  
  

 
  const Income = transactions
    .filter(t => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);


  const Expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const Balance = Income - Expense;

const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [Income, Expense],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
<div className="dashboard-container">

  <h1>Dashboard</h1>

  <div className="stats">
    <div className="stats-card Balance">Balance: ₹{Balance}</div>
    <div className="stats-card Income">Income: ₹{Income}</div>
    <div className="stats-card Expense">Expense: ₹{Expense}</div>
  </div>

  
  <div className="data-section">

    
    <div className="chart-box">
      <Pie data={data} />
    </div>

    
    <div className="table-box">
      <h3 className="Transactions">Transactions</h3>

      {transactions.length === 0 ? (
        <p className="no-data">No transactions yet</p>
      ) : (
        <table className="trans-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td className={t.type}>{t.type}</td>
                <td>{t.category}</td>
                <td>₹{t.amount}</td>
                <td>{t.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  </div>
</div>

    </div>
  );
}

export default Dashboard;
