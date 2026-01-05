import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];


    const user = users.find(
      u => u.email === email && u.password === password
    );
    if (!user) {
      alert("no user found! please sign up");
      return navigate("/signup");
    }

    if (user.email === email && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      alert("login successful");
    
  localStorage.setItem("currentUser", JSON.stringify(user));
  navigate("/dashboard");
};
}  
  return (
    <div className="login-container">
      <h2>Wallet Wizard</h2>

      <form onSubmit={handleLogin} className="login-form">

        <label>Email</label>
        <input
          type="email"
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="switch-page">
          New here? <Link to="/signup">Create an account</Link>
        </p>

      </form>
    </div>
  );

};

export default Login
