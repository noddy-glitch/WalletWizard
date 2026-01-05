import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Signup.css';

const Signup = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const g = "ad@gmail.com";


  const generateId = (email) => {
    // console.log(email)
    if(email === undefined){
      return "UID" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      
    }else{
  return     email.slice(0, 4).toUpperCase()  + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }
  };

  console.log(generateId())

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);
    if (exists) {
      alert("User already exists");
      return;
    }
    const id =generateId(email)
    
    const newUser = {
      id: id,
      email,
      password,
      role: email === "ad@gmail.com" ? "admin" : "user"
    };

    const nuser = [...users , newUser]
localStorage.setItem("role" , JSON.stringify(newUser.role))

    localStorage.setItem("users", JSON.stringify(nuser));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

   
    alert("Account Created Successfully");
    navigate("/dashboard");
  };

  return (
    <>
      <div className='Signup-container'>
        <h2>Create Account</h2>

        <form onSubmit={handleSignup} className='Signup-form'>
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign-up</button>
        </form>

        <p className="switch-page">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
