import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function MembershipPaymentList() {
    const { CustomerID } = useContext(CustomerContext);
    const [memPayments, setMemPayments] = useState([]);
   
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:8000/api/user/getPaymentForMembership",
          {
            headers: {
              customerId: `${CustomerID}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setMemPayments(data);
      };
      fetchData();
    }, []);
  
    return (
      <div style={{ margin: "auto", maxWidth: "80%" }}>
        <h1>Payment for Membership</h1>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Membership Tier</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Time</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Total Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {memPayments.map((memPayment) => (
              <tr key={memPayment.Membership_ID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{memPayment.Tier}</td>
                {/* <td style={{ padding: "10px" }}>{memPayment.time}</td>
                <td style={{ padding: "10px" }}>{new Date(memPayment.Class_Date).toDateString()}</td>
                <td style={{ padding: "10px" }}>{memPayment.Class_Time}</td>
                <td style={{ padding: "10px" }}>{memPayment.Amount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default MembershipPaymentList;