import React, { useState } from "react";
import "../style/Payment.css";

const Payment = ({ addTransaction }) => {

  const [formData, setFormData] = useState({
    receiverName: "",
    ifscCode: "",
    accountNo: "",
    amount: "",
  });
 
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const { receiverName, ifscCode, accountNo, amount } = formData;


    if (!receiverName || !ifscCode || !accountNo || !amount) {
      return alert("Please fill all fields");
    }


    const newTransaction = {
      id: Date.now(),
      receiverName,
      ifscCode,
      accountNo,
      amount,
      time: new Date().toLocaleString(),
    };


    addTransaction(newTransaction);


    setFormData({
      receiverName: "",
      ifscCode: "",
      accountNo: "",
      amount: "",
    });

    alert("Payment Successful!");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Make Payment</h1>

        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="text"
            name="receiverName"
            placeholder="Receiver Name"
            value={formData.receiverName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="ifscCode"
            placeholder="IFSC Code"
            value={formData.ifscCode}
            onChange={handleChange}
          />

          <input
            type="number"
            name="accountNo"
            placeholder="Account Number"
            value={formData.accountNo}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
