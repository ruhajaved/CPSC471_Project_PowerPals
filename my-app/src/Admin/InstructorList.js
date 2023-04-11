import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import UpdateInstructor from "./UpdateInstructor";

function InstructorList() {
  const { AdminID } = useContext(AdminContext);
  const [instructors, setInstructors] = useState([]);
  const [classTypes, setClassTypes] = useState(null);

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
    const fetchData2 = async () => {
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
    };
    fetchData();
    fetchData2();
  }, []);

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
                {classTypes && (
                  <UpdateInstructor
                    instructor={instructor}
                    classTypes={classTypes}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorList;
