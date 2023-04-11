import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import { AdminContext } from "../Context/AdminContext";

function UpdateGym({ gym }) {
  const { AdminID } = useContext(AdminContext);
  const [address, setAddress] = useState(gym.address);
  const [gymName, setGymName] = useState(gym.name);
  const [studios, setStudios] = useState(gym.studios);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleGymNameChange = (event) => {
    console.log(event.target.value);
    setGymName(event.target.value);
  };

  const handleStudioChange = (event, index) => {
    const newStudios = [...studios];
    newStudios[index][event.target.name] = event.target.value;
    setStudios(newStudios);
    console.log(studios);
  };

  const handleUpdate = (close) => {
    const updatedGym = {
      gym: {
        address: address,
        gym_name: gymName,
      },
      studios: studios,
    };
    console.log(updatedGym);
    fetch(`http://localhost:8000/api/admin/updateGym/${gym.gymId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", admin: `${AdminID}` },
      body: JSON.stringify(updatedGym),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
        close();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Popup
      trigger={
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Gym
        </button>
      }
      modal
      closeOnDocumentClick
      contentStyle={{
        background: "#1c1c1c",
        width: "80%",
        borderRadius: "15px",
        padding: "1em 2em",
        border: "none",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      {(close) => (
        <div className="popup">
          <h2 style={{ color: "#ffffff", marginBottom: "1em" }}>Update Gym</h2>
          <form style={{ marginBottom: "1em" }}>
            <label
              style={{
                color: "#ffffff",
                display: "block",
                marginBottom: "0.5em",
              }}
            >
              Address:
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "block",
                marginBottom: "0.5em",
              }}
            >
              Gym Name:
              <input
                type="text"
                value={gymName}
                onChange={handleGymNameChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
            </label>
            {studios.map((studio, index) => (
              <div key={index} style={{ marginBottom: "1em" }}>
                <label
                  style={{
                    color: "#ffffff",
                    display: "block",
                    marginBottom: "0.5em",
                  }}
                >
                  Studio Name:
                  <input
                    type="text"
                    name="name"
                    value={studio.name}
                    onChange={(event) => handleStudioChange(event, index)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
                <label
                  style={{
                    color: "#ffffff",
                    display: "block",
                    marginBottom: "0.5em",
                  }}
                >
                  Room No:
                  <input
                    type="text"
                    name="roomNo"
                    value={studio.roomNo}
                    onChange={(event) => handleStudioChange(event, index)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
                <label
                  style={{
                    color: "#ffffff",
                    display: "block",
                    marginBottom: "0.5em",
                  }}
                >
                  Size:
                  <input
                    type="text"
                    name="size"
                    value={studio.size}
                    onChange={(event) => handleStudioChange(event, index)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      width: "90%",
                    }}
                  />
                </label>
              </div>
            ))}
            <button
              type="button"
              style={{
                background: "#4CAF50",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1em",
                marginTop: "1em",
                marginRight: "1em",
              }}
              onClick={(event) => handleUpdate(close)}
            >
              Update
            </button>
            <button
              className="button"
              style={{
                background: "#d33",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1em",
                marginTop: "1em",
              }}
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Close Modal
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default UpdateGym;
