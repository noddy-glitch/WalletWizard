import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Add_Entry from "./components/Add_Entry";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Payment from "./components/Payment";
import Finance_planner from "./components/Finance_planner";
import Settings from "./components/Settings";
import Loan from "./components/Loan";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  
  const role = localStorage.getItem("role");

  const hideNavbarPaths = ["/login", "/signup"];
  const location = useLocation();

  const [hideNavbar, setHideNavbar] = useState(
    hideNavbarPaths.includes(location.pathname)
  );

  // login check
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("users"));



  const [transactions, setTransactions] = useState([]);

 const addTransaction = (transaction) => {
  setTransactions(prev => [transaction, ...prev]);
};


  // user routes
  const userRoutes = [
    { path: "/addtrans", element: <Add_Entry addTransaction={addTransaction} /> },
    { path: "/dashboard", element: <Dashboard transactions={transactions} /> },
    { path: "/settings", element: <Settings /> },
    { path: "/loan_management", element: <Loan /> },
    { path: "/login", element: <Login setLoggedIn={setLoggedIn} /> },
    { path: "/signup", element: <Signup /> },
   { path: "/payment", element : <Payment addTransaction={addTransaction} />},
  ];

  // admin routes
  const adminRoutes = [
    { path: "/payment", element : <Payment addTransaction={addTransaction} />},
    { path: "/finance_planner", element: <Finance_planner /> },
    { path: "/login", element: <Login setLoggedIn={setLoggedIn} /> },
    { path: "/signup", element: <Signup /> },
  ];

  const finalRoutes = role === "admin" ? adminRoutes : userRoutes;

  useEffect(() => {
    setHideNavbar(hideNavbarPaths.includes(location.pathname));
    
  },
   [location.pathname]



);

  return (
    <>
      {!hideNavbar && role && (
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}

      <Routes>
        {/* redirect root path */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {finalRoutes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
