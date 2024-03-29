import React, { useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function AdminLogin() {
  const { login } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    console.log(email);
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });
      const data = await response.json();
      console.log(data);
      login(data.Admin_ID);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin</h1>
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

export default AdminLogin;
