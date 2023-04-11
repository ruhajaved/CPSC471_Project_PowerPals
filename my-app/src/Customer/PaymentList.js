import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function PaymentList() {
    const { CustomerID } = useContext(CustomerContext);
    const [payments, setPayments] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:8000/api/user/getPaymentForClasses",
          {
            headers: {
              customerId: `${CustomerID}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setPayments(data);
      };
      fetchData();
    }, []);
  
    return (
      <div style={{ margin: "auto", maxWidth: "80%" }}>
        <h1>List of Payments for Classes</h1>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Class Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Original Cost</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Class Duration</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Time</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Total Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.Class_ID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{payment.Class_Name}</td>
                <td style={{ padding: "10px" }}>{payment.Class_Cost}</td>
                <td style={{ padding: "10px" }}>{payment.Class_Duration}</td>
                <td style={{ padding: "10px" }}>{new Date(payment.Class_Date).toDateString()}</td>
                <td style={{ padding: "10px" }}>{payment.Class_Time}</td>
                <td style={{ padding: "10px" }}>{payment.Amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default PaymentList;