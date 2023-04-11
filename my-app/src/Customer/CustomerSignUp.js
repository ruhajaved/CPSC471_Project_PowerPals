import React, { useEffect, useState, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function CustomerSignUp() {
  const { login } = useContext(CustomerContext);

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    gender: "",
    dateOfBirth: "Example: 2020-10-22 05:49:00",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("here" + " " + customer);
    setCustomer({ ...customer, [name]: value });
    console.log("here" + " " + customer);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      customer.firstName === "" ||
      customer.lastName === "" ||
      customer.address === "" ||
      customer.email === "" ||
      customer.dateOfBirth === "" ||
      customer.password === "" 
    ) {
      return;
    }
    const requestBody = {
      customer
    };
    // make POST request using the requestBody
    console.log(requestBody);
    fetch("http://localhost:8000/api/user/signUpUser", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data); login(data.customerId);})
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSignUp} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Customer Sign Up</h1>
      <label style={{ display: "block", marginBottom: "10px" }}>
        First Name:
        <input
          type="text"
          name="firstName"
          value={customer.firstName}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={customer.lastName}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Address:
        <input
          type="text"
          name="address"
          value={customer.address}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Email:
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Gender:
        <select
          name="gender"
          value={customer.gender}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-binary</option>
        </select>
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Date of Birth:
        <input
          type="text"
          name="dateOfBirth"
          value={customer.dateOfBirth}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Password:
        <input
          type="password"
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
        Sign up!
      </button>
    </form>
  );
}

export default CustomerSignUp;
