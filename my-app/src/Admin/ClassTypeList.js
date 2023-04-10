import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function ClassTypeList() {
  const { AdminID } = useContext(AdminContext);
  const [classTypes, setClassTypes] = useState([]);

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
      console.log(data);
      setClassTypes(data);
    };
    fetchData();
  }, []);

  const handleClassType = async (drop_classType) => {
    console.log(drop_classType);
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/deleteCategory/${drop_classType.Class_Category}`,
        {
          method: "DELETE",
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setClassTypes((classType) =>
        classType.filter(
          (safe_Type) =>
            safe_Type.Class_Category !== drop_classType.Class_Category
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <h1>List of Class Types</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Class Category
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Intensity Level
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>
              Equipment Required
            </th>
            <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classTypes.map((classType) => (
            <tr
              key={classType.Class_Category}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              <td style={{ padding: "10px" }}>{classType.Class_Category}</td>
              <td style={{ padding: "10px" }}>{classType.Intensity_Level}</td>
              <td style={{ padding: "10px" }}>
                {classType.Equipment_Required}
              </td>
              <td style={{ padding: "10px" }}>
                {/* <UpdateGym gym={gym} /> */}
                <button
                  onClick={() => handleClassType(classType)}
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
                  Delete Class Type
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassTypeList;
