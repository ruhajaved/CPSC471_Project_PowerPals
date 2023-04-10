import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function ClassList() {
  const { AdminID } = useContext(AdminContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllClasses",
        {
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setClasses(data);
    };
    fetchData();
  }, []);

  const handleDeleteClass = async (classObj) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/deleteClass/${classObj.Class_ID}`,
        {
          method: "DELETE",
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setClasses((prevClasses) =>
        prevClasses.filter(
          (safe_class) => safe_class.Class_ID !== classObj.Class_ID
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <h1>List of Classes</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Cost</th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Class Duration
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Class Description
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Date</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Time</th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Equipment Required
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>Max People</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Gym Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Address</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Studio Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Instructor Name
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>Created By</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classObj) => (
            <tr
              key={classObj.Class_ID}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td style={{ padding: "10px" }}>{classObj.Class_Name}</td>
              <td style={{ padding: "10px" }}>{"$" + classObj.Class_Cost}</td>
              <td style={{ padding: "10px" }}>
                {classObj.Class_Duration + " minutes"}
              </td>
              <td style={{ padding: "10px" }}>{classObj.Class_Description}</td>
              <td style={{ padding: "10px" }}>{classObj.Class_Date}</td>
              <td style={{ padding: "10px" }}>{classObj.Class_Time}</td>
              <td style={{ padding: "10px" }}>{classObj.Equipment_Required}</td>
              <td style={{ padding: "10px" }}>{classObj.No_of_Max_Ppl}</td>
              <td style={{ padding: "10px" }}>{classObj.Gym_Name}</td>
              <td style={{ padding: "10px" }}>{classObj.Address}</td>
              <td style={{ padding: "10px" }}>{classObj.Studio_Name}</td>
              <td style={{ padding: "10px" }}>
                {classObj.First_Name + " " + classObj.Last_Name}
              </td>
              <td style={{ padding: "10px" }}>{classObj.admin_email}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => handleDeleteClass(classObj)}
                  style={{
                    marginLeft: "8px",
                    padding: "10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete Class
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;
