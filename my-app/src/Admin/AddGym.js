import React, { useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function AddGym() {
  const { AdminID } = useContext(AdminContext);
  const [gymName, setGymName] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [studios, setStudios] = useState([{ roomNo: "", name: "", size: "" }]);
  const [success, setSuccess] = useState(false);

  function validateStudios(studios) {
    for (let i = 0; i < studios.length; i++) {
      const { roomNo, name, size } = studios[i];
      if (roomNo === "" || name === "" || size === "") {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (gymName === "" || gymAddress === "" || !validateStudios(studios)) {
      return;
    }
    const requestBody = {
      gym: {
        name: gymName,
        address: gymAddress,
      },
      studios,
    };
    fetch("http://localhost:8000/api/admin/createGym", {
      method: "POST",
      headers: { "Content-Type": "application/json", admin: `${AdminID}` },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => console.error(error));
  };

  const handleStudioChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStudios = [...studios];
    updatedStudios[index][name] = value;
    setStudios(updatedStudios);
  };

  const handleAddStudio = () => {
    setStudios([...studios, { roomNo: "", name: "", size: "" }]);
  };

  const handleRemoveStudio = (index) => {
    const updatedStudios = [...studios];
    updatedStudios.splice(index, 1);
    setStudios(updatedStudios);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: "5px" }}>Add Gym:</h3>
        <label style={{ marginBottom: "10px" }}>
          <h3 style={{ marginBottom: "5px" }}>Gym Name:</h3>
          <input
            type="text"
            value={gymName}
            onChange={(event) => setGymName(event.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid grey",
              width: "250px",
            }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          <h3 style={{ marginBottom: "5px" }}>Gym Address:</h3>
          <input
            type="text"
            value={gymAddress}
            onChange={(event) => setGymAddress(event.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid grey",
              width: "250px",
            }}
          />
        </label>
        <h3>Studios:</h3>
        {studios.map((studio, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label style={{ marginBottom: "5px" }}>
              Studio Room No.:
              <input
                type="number"
                name="roomNo"
                value={studio.roomNo}
                onChange={(event) => handleStudioChange(event, index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  width: "75px",
                }}
              />
            </label>
            <label style={{ marginBottom: "5px" }}>
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
                  border: "1px solid grey",
                  width: "250px",
                }}
              />
            </label>
            <label style={{ marginBottom: "5px" }}>
              Studio Size:
              <input
                type="number"
                name="size"
                value={studio.size}
                onChange={(event) => handleStudioChange(event, index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  width: "75px",
                }}
              />
            </label>
            {index > -1 && (
              <button
                type="button"
                onClick={() => handleRemoveStudio(index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid grey",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Remove Studio
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStudio}
          style={{
            marginBottom: "10px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Add Studio
        </button>
        <button
          type="submit"
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid grey",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Submit
        </button>
        {success && (
          <h3
            style={{
              color: "green",
              backgroundColor: "lightgreen",
              padding: "10px",
            }}
          >
            Successfully Added Gym! Page will refresh shortly.
          </h3>
        )}
      </form>
    </div>
  );
}

export default AddGym;
