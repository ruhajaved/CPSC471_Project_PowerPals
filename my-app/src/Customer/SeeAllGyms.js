import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";
//import UpdateGym from "./UpdateGym";
import Popup from "reactjs-popup"; // import your Popup component here

function SeeAllGyms() {
  const { customerID } = useContext(CustomerContext);
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllGyms",
        {
          headers: {
            admin: `${customerID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setGyms(data);
    };
    fetchData();
  }, []);

  const handleUpdateGym = (gym) => {
    console.log(gym);
    setSelectedGym(gym);
    setOpenUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedGym(null);
    setOpenUpdateForm(false);
  };

  const handleDeleteGym = async (gym) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/deleteGym/${gym.gymId}`,
        {
          method: "DELETE",
          headers: {
            customer: `${customerID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <h1>List of Gyms</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Gym Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Address</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Studios</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gyms.map((gym) => (
            <tr key={gym.gymId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{gym.name}</td>
              <td style={{ padding: "10px" }}>{gym.address}</td>
              <td style={{ padding: "10px" }}>
                {gym.studios.map((studio) => (
                  <div key={studio.roomNo}>
                    <p>{studio.name}</p>
                    <p>Room No: {studio.roomNo}</p>
                    <p>Size: {studio.size}</p>
                  </div>
                ))}
              </td>
              <td style={{ padding: "10px" }}>

                <button
                  onClick={() => handleDeleteGym(gym)}
                  style={{
                    marginLeft: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete Gym
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeeAllGyms;
