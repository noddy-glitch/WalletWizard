import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  const handleLogout = () => {
    localStorage.removeItem("role");

    setLoggedIn(false);
    navigate('/login')

  };

  return (
    <nav className="Navbar">
      <h2>Wallet Wizard</h2>

      <div className="NavLinks">
        <Link to="/addtrans">Add</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/loan_management">Loan</Link>
        <Link to="/finance_planner">Finance Planner</Link>
        <Link to="/settings">Settings</Link>

        {
          !role ?
            <Link className="login-btn" to="/login">
              Login
            </Link>
            :
            <button className="text-[15px]" onClick={handleLogout}>
              Logout
            </button>

        }
      </div>
    </nav>
  );
};

export default Navbar;
