import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function GymList() {
    const { CustomerID } = useContext(CustomerContext);
    const [gyms, getGyms] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:8000/api/user/getAllGymsUser",
          {
            headers: {
              customerId: `${CustomerID}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        getGyms(data);
      };
      fetchData();
    }, []);
  
    return (
      <div style={{ margin: "auto", maxWidth: "80%" }}>
        <h1>List of Gyms</h1>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Gym Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Address</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Studios</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((gym) => (
              <tr key={gym.Gym_ID} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{gym.name}</td>
                <td style={{ padding: "10px" }}>{gym.address}</td>
                  <td style={{ padding: "10px" }}>
                    {gym.studios.map((studio) => (
                      <div key={studio.roomNo}>
                        <p>{studio.name}</p>
                        <p>Room No: {studio.roomNo}</p>
                      </div>
                    ))}
                  </td>

                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default GymList;