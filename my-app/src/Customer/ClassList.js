import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";
import BuyClass from "./BuyClass";

function ClassList() {
  const { CustomerID } = useContext(CustomerContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/user/getClasses",
        {
          headers: {
            customerId: `${CustomerID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setClasses(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <h1>List of Classes</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Cost</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Duration (Weeks)</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Start Date</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Description</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Max Seats</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Time</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Class Category</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Instructor Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Instructor Gender</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Instructor Languages</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Studio Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Intensity Level</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Equipment Requirement</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((eachClass) => (
            <tr key={eachClass.classId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{eachClass.Class_Name}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Cost}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Duration}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Date}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Description}</td>
              <td style={{ padding: "10px" }}>{eachClass.No_of_Max_Ppl}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Time}</td>
              <td style={{ padding: "10px" }}>{eachClass.Class_Category}</td>
              <td style={{ padding: "10px" }}>{eachClass.First_Name + " " + eachClass.Last_Name}</td>
              <td style={{ padding: "10px" }}>{eachClass.Gender}</td>
              <td style={{ padding: "10px" }}>{eachClass.Languages}</td>
              <td style={{ padding: "10px" }}>{eachClass.Studio_Name}</td>
              <td style={{ padding: "10px" }}>{eachClass.Intensity_Level}</td>
              <td style={{ padding: "10px" }}>{eachClass.Equipment_Required}</td>
              <td style={{ padding: "10px" }}>
                <BuyClass eachClass={eachClass} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;