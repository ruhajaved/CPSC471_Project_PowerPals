import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function AddClassType() {
  const { AdminID } = useContext(AdminContext);

  const [classType, setClassType] = useState({
    class_category: "",
    intensity_level: "",
    equipment_required: "",
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClassType({ ...classType, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      classType.class_category === "" ||
      classType.intensity_level === "" ||
      classType.equipment_required === ""
    ) {
      return;
    }
    const requestBody = {
      Class_Category: classType.class_category,
      Intensity_Level: classType.intensity_level,
      Equipment_Required: classType.equipment_required,
    };
    // make POST request using the requestBody
    console.log(requestBody);
    fetch("http://localhost:8000/api/admin/createCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json", admin: `${AdminID}` },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 style={{ marginBottom: "5px" }}>Add Class Type:</h3>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Class Category:
        <input
          type="text"
          name="class_category"
          value={classType.class_category}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Intensity Level:
        <input
          type="number"
          name="intensity_level"
          value={classType.intensity_level}
          onChange={handleInputChange}
          max={10}
          min={0}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Equipment Required:
        <input
          type="text"
          name="equipment_required"
          value={classType.equipment_required}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
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
          Successfully Added Class Type! Page will refresh shortly.
        </h3>
      )}
    </form>
  );
}

export default AddClassType;
