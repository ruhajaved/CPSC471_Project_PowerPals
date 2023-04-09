import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";
//import UpdateGym from "./UpdateGym"; 
// THIS IS WHERE WE WILL ADD PAYMENT 
import Popup from "reactjs-popup"; // import your Popup component here

function SeeClasses() {
  const { customerID } = useContext(CustomerContext);
  const [ClassList, setClasses] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
 // const [openUpdateForm, setOpenUpdateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/user/getClassesAsUser",
        {
          headers: {
            customer: `${customerID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setClasses(data);
    };
    fetchData();
  }, []);

  // const handleUpdateGym = (class) => {
  //   console.log(class);
  //   setSelectedGym(class);
  //   setOpenUpdateForm(true);
  // };

  // const handleCloseUpdateForm = () => {
  //   setSelectedGym(null);
  //   setOpenUpdateForm(false);
  // };

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
            <th style={{ textAlign: "left", padding: "10px" }}>Equipment Requirement </th>
          </tr>

        </thead>
         <tbody>
            {/* THIS IS WHERE YOU INSERT THE CODE FOR DISPLAYING THE VALUES FOR EACH CLASS  */}

          {/* THIS IS MUSTAFA'S CODE FOR THE GYM - I have replaced all values  */}

          {/*
          {classes.map((classes) => (
            <tr key={class.classId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{classes.name}</td>
              <td style={{ padding: "10px" }}>{classes.address}</td>
              <td style={{ padding: "10px" }}>
              </td>
              <td style={{ padding: "10px" }}>

                <button
                  // onClick={() => BuyClass(classes)} // THIS IS WHERE YOU INSERT FUNCTION TO BUY
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
                  Buy Class
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default SeeClasses;

//THIS IS MUSTAFA'S CODE FOR THE GYM - I have replaced all values 
          {/*
          {classes.map((classes) => (
            <tr key={class.classId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{classes.name}</td>
              <td style={{ padding: "10px" }}>{classes.address}</td>
              <td style={{ padding: "10px" }}>
              </td>
              <td style={{ padding: "10px" }}>

                <button
                  // onClick={() => BuyClass(classes)} // THIS IS WHERE YOU INSERT FUNCTION TO BUY
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
                  Buy Class
                </button>
              </td>
            </tr>
          ))} */}