import React, { useState } from 'react';
import '../style/Add_Entry.css';
import { useNavigate } from 'react-router-dom';

const Add_Entry = ({ addTransaction, incomeCategories, expenseCategories }) => {
  const userID = localStorage.getItem("currentuser")
 const loginInfo = JSON.parse(localStorage.getItem("userExist"));
  

  const initialIncomeCategories = ['Salary', 'Freelance', 'Investments'];
  const initialExpenseCategories = ['Food', 'Transport', 'Shopping', 'Bills']

if (!loginInfo || !loginInfo.id) {
  return <p>Please login again</p>;
}




  const generateId = () => {
    return "U" + Date.now();
  };



  const navigate = useNavigate();


  const categories = {
    Income: initialIncomeCategories,
    Expense: initialExpenseCategories,
  };
  const paymentMethods = [
    { label: '💵 Cash', value: 'Cash' },
    { label: '💳 Card', value: 'Card' },
    { label: '🔁 UPI', value: 'UPI' },
    { label: '🏦 Bank Transfer', value: 'Bank Transfer' },
  ];

  const transid = generateId();
  const [form, setForm] = useState({
    type: 'Expense',
    category: '',
    amount: '',
    description: '',
    date: '',
    paymentMethod: '',
    userId: loginInfo.id,
    transactionID: generateId()

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setForm({ ...form, type: value, category: '' });
    }
    else {
      setForm({ ...form, [name]: value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.paymentMethod || !form.date) return;

    const newTransaction = {
      // id:userID.id,
      ...form,
      amount: parseFloat(form.amount),
      date: form.date,
    };


    addTransaction(newTransaction);
    localStorage.setItem("hhh", JSON.stringify())


    let data = JSON.parse(localStorage.getItem("transactions")) || [];
    if (!Array.isArray(data)) {
      data = [];
    }
    data.push(newTransaction);

    const newdata = [...data , newTransaction]


    localStorage.setItem("transactions", JSON.stringify(newdata));

    setForm({
      type: 'Expense',
      category: '',
      amount: '',
      description: '',
      date: '',
      paymentMethod: '',
    });
    navigate("/Dashboard");

  };

  return (
    <div className="tracker-container">
      <h2>Track your Income n Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <label>
          Transaction type
        </label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <label>
          Category
        </label>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">--select category--</option>
          {(categories[form.type] || []).map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <label>
          Amount
          <input type="number" name="amount" placeholder='Enter Amount' value={form.amount}
            onChange={handleChange} required />
        </label>

        <label>
          Date:<br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

        </label>
        <label> Payment method
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
            <option value="">--Select Payment Method</option>
            {paymentMethods.map((method, idx) => (
              <option key={idx} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </label>

        <label>Description <span className='optional'>(optional)</span>
          <input type="text"
            name="description"
            placeholder="e.g. Grocery shopping, freelance"
            value={form.description}
            onChange={handleChange} />
        </label>
        <button type='submit'>Add Transaction</button>
      </form>
    </div>
  )
}

export default Add_Entry
