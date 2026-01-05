import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../style/Loan.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Loan = () => {

  const[l , setl] = useState({
    loana: "200000", 
    loanint:"9",
    tenure:"5",
    })
  const [loanAmount, setLoanAmount] = useState(2600000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenure, setTenure] = useState(20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);


  useEffect(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure * 12;

    if (R === 0) return;

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPay = EMI * N;
    const interest = totalPay - P;

    setEmi(Math.round(EMI));
    setTotalPayment(Math.round(totalPay));
    setTotalInterest(Math.round(interest));
  }, [loanAmount, interestRate, tenure]);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(l.loana );
    


    const newLoan = {
      id: Date.now(),
      title: "Loan",
      loanAmount,
      interestRate,
      tenure,
      emi,
      totalInterest,
      totalPayment,
      paidEmis: 0,
      lastPaidMonth: null,
      createdAt: new Date().toISOString(),
    };

    const existingLoans = JSON.parse(localStorage.getItem("loans"));


    const loans = existingLoans || [];


    loans.push(newLoan);


    localStorage.setItem("loans", JSON.stringify(loans));

    alert("Loan added successfully!");


    console.log("s");

  }
  const pieData = {
    labels: ["Principal Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#7CB342", "#FB8C00"],
      },
    ],
  };

  return (


    <div className="loan-container">

      <form onSubmit={handlesubmit}>

        <div className="input-section">

          <div className="loan-box">
            <label>Loan Amount</label>
            <div className="input-row">
              <input
                type="text"
                name="loana"
                value={l.loana}
                onChange={(e) =>
                  setl({...l , [e.target.name] : e.target.value})
                }
              />
              <span className="unit">₹</span>
            </div>

            <input
              type="range"
              min="0"
              max="20000000"
              step="50000"
              name="loana"
              value={l.loana}
              onChange={(e) =>setl({...l , [e.target.name] : e.target.value})}
              className="slider"
            />
          </div>


          <div className="loan-box">
            <label>Interest Rate</label>
            <div className="input-row">
              <input
                type="number"
                name="loanint"
                value={l.loanint}
                onChange={(e) => setl({...l , [e.target.name] : e.target.value})}
              />
              <span className="unit">%</span>
            </div>

            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              name="loanint"
              value={l.loanint}
              onChange={(e) =>  setl({...l , [e.target.name] : e.target.value})}
              className="slider"
            />

          </div>



          <div className="loan-box">
            <label>Loan Tenure (Years)</label>
            <div className="input-row">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
              <span className="unit">Yr</span>
            </div>

            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="slider"
            />

          </div>

        </div>



        <div className="result-section">

          <div className="result-box">
            <h3>Loan EMI</h3>
            <p className="value">₹ {emi.toLocaleString("en-IN")}</p>

            <h4>Total Interest Payable</h4>
            <p className="value">₹ {totalInterest.toLocaleString("en-IN")}</p>

            <h4>Total Payment (Principal + Interest)</h4>
            <p className="value">₹ {totalPayment.toLocaleString("en-IN")}</p>
          </div>

          <div className="chart-box">
            <h3>Break-up of Total Payment</h3>
            <Pie data={pieData} />
          </div>

        </div>



        <button type="Submit">Add Loan</button>

      </form>
    </div>
  );
};

export default Loan;
