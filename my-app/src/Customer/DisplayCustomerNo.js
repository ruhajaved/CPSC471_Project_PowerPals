import React, { useEffect, useState, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function DisplayMembership() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/user/getMembership",
        {
          headers: {
            customer: `${customerId}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setInstructors(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/getMembership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      login(data.Customer_ID);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form onSubmit={handleSignUp} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Customer Sign Up</h1>
      <label style={{ display: "block", marginBottom: "10px" }}>
        TEST:
        <input
          type="text"
          name="password"
          checked={customer.password}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        membership!
      </button>
    </form>
  );
}

export default CustomerSignUp;
