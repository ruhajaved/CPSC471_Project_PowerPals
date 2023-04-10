import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function AddInstructor() {
  const { AdminID } = useContext(AdminContext);

  const [instructor, setInstructor] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    gender: "",
    languages: "",
    status_active: false,
  });
  const [classes, setClasses] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllCategories",
        {
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      setClassTypes(data);
      console.log(classTypes);
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInstructor({ ...instructor, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setInstructor({ ...instructor, [name]: checked });
  };

  const handleClassesChange = (event) => {
    const { options } = event.target;
    const selectedClasses = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedClasses.push(options[i].value);
      }
    }
    setClasses(selectedClasses);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      instructor.first_name === "" ||
      instructor.last_name === "" ||
      instructor.address === "" ||
      instructor.gender === "" ||
      instructor.languages === "" ||
      classes.length === 0
    ) {
      return;
    }
    const requestBody = {
      instructor,
      classes,
    };
    // make POST request using the requestBody
    console.log(requestBody);
    fetch("http://localhost:8000/api/admin/createInstructor", {
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

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 style={{ marginBottom: "5px" }}>Add Instructor:</h3>
      <label style={{ display: "block", marginBottom: "10px" }}>
        First Name:
        <input
          type="text"
          name="first_name"
          value={instructor.first_name}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={instructor.last_name}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Address:
        <input
          type="text"
          name="address"
          value={instructor.address}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Email:
        <input
          type="email"
          name="email"
          value={instructor.email}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Gender:
        <select
          name="gender"
          value={instructor.gender}
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
        Languages:
        <input
          type="text"
          name="languages"
          value={instructor.languages}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Active:
        <input
          type="checkbox"
          name="status_active"
          checked={instructor.status_active}
          onChange={handleCheckboxChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Classes:
        <select
          multiple={true}
          onChange={handleClassesChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        >
          {classTypes.map((classType) => (
            <option
              key={classType.Class_Category}
              value={classType.Class_Category}
            >
              {classType.Class_Category}
            </option>
          ))}
        </select>
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
          Successfully Added Instructor! Page will refresh shortly.
        </h3>
      )}
    </form>
  );
}

export default AddInstructor;
