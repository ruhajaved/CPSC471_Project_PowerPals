import React, { useState, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function CustomerLogin() {
  const { login } = useContext(CustomerContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });
      const data = await response.json();
      console.log(data);
      login(data.Customer_ID);
    //   console.log("HERE HERE HERE");
    //   const response2 = await fetch("http://localhost:8000/api/user/getMembership", {
    //     headers: {
    //       customerId: `${CustomerID}`,
    //     },
    //   }
    //   )
    // const data2 = await response2.json();
    // console.log(JSON.stringify(data2));
    // console.log("HERE HERE HERE");
    // console.log(data2);
    } catch (error) {
      console.error(error);
    }
    //checkMembership();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ marginBottom: "20px" }}>Customer Login</h1>
      <form>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ display: "block", marginBottom: "10px" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default CustomerLogin;
