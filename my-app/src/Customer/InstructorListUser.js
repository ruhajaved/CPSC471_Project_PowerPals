import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function InstructorList() {
  const { CustomerID } = useContext(CustomerID);
  const [instructors, setInstructors] = useState([]);
  const [selectedGym, setSelectedInstructor] = useState(null);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllInstructors",
        {
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setInstructors(data);
    };
    fetchData();
  }, []);

  const handleUpdateInstructor = (gym) => {
    setSelectedInstructor(gym);
    setOpenUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedInstructor(null);
    setOpenUpdateForm(false);
  };

  const handleUpdate = (updatedGym) => {
    // handle the update logic here
    console.log(updatedGym);
    setOpenUpdateForm(false);
  };

  const handleDeleteInstructor = async (instructor) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/deleteGym/${instructor.Id}`,
        {
          method: "DELETE",
          headers: {
            admin: `${AdminID}`,
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
      <h1>List of Instructors</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f8f8",
              borderBottom: "1px solid #ddd",
            }}
          >
            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Address</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Gender</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Languages</th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Classes Taught
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>Active</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr
              key={instructor.Instructor_ID}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td style={{ padding: "10px" }}>
                {instructor.First_Name} {instructor.Last_Name}
              </td>
              <td style={{ padding: "10px" }}>{instructor.Address}</td>
              <td style={{ padding: "10px" }}>{instructor.Email}</td>
              <td style={{ padding: "10px" }}>{instructor.Gender}</td>
              <td style={{ padding: "10px" }}>{instructor.Languages}</td>
              <td style={{ padding: "10px" }}>{instructor.classes_taught}</td>
              <td style={{ padding: "10px" }}>{instructor.Status_Active}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleUpdateInstructor(instructor)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorList;
