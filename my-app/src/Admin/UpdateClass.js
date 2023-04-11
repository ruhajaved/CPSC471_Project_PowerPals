import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import { AdminContext } from "../Context/AdminContext";

function UpdateClass({ classInfo }) {
  const { AdminID } = useContext(AdminContext);
  const [className, setClassName] = useState(classInfo.Class_Name);
  const [classDate, setClassDate] = useState(classInfo.Class_Date);
  const [classTime, setClassTime] = useState(classInfo.Class_Time);
  const [classCost, setClassCost] = useState(classInfo.Class_Cost);
  const [maxPpl, setMaxPpl] = useState(classInfo.No_of_Max_Ppl);
  const [classDescription, setClassDescription] = useState(
    classInfo.Class_Description
  );
  const [classDuration, setClassDuration] = useState(classInfo.Class_Duration);

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleClassDateChange = (event) => {
    setClassDate(event.target.value);
  };

  const handleClassTimeChange = (event) => {
    setClassTime(event.target.value);
  };

  const handleClassDurationChange = (event) => {
    setClassDuration(event.target.checked);
  };

  const handleClassCostChange = (event) => {
    setClassCost(event.target.value);
  };

  const handleMaxPplChange = (event) => {
    setMaxPpl(event.target.value);
  };

  const handleClassDescriptionChange = (event) => {
    setClassDescription(event.target.checked);
  };

  const handleUpdate = (close) => {
    const updatedInstructor = {
      Class_Name: className,
      Class_Date: classDate,
      Class_Time: classTime,
      Class_Cost: classCost,
      No_of_Max_Ppl: maxPpl,
      Class_Description: classDescription,
      Class_Duration: classDuration,
      Gym_ID: classInfo.gym_ID,
      Studio_Room_No: classInfo.Studio_Room_No,
      Instructor_ID: classInfo.Instructor_ID,
    };

    fetch(`http://localhost:8000/api/admin/updateClass/${classInfo.Class_ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", admin: `${AdminID}` },
      body: JSON.stringify(updatedInstructor),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
        close();
      })
      .catch((error) => {
        console.error(error);
      });
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
          Update Class
        </button>
      }
      modal
      closeOnDocumentClick
      contentStyle={{
        background: "#1c1c1c",
        width: "80%",
        borderRadius: "15px",
        padding: "1em",
        border: "none",
      }}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      {(close) => (
        <div
          className="popup"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#ffffff", margin: "0 0 10px 0" }}>
            Update Class
          </h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Name:
              <input
                type="text"
                value={className}
                onChange={handleClassNameChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Date:
              <input
                type="date"
                value={classDate}
                onChange={handleClassDateChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Time:
              <input
                type="time"
                value={classTime}
                onChange={handleClassTimeChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Cost:
              <input
                type="number"
                value={classCost}
                onChange={handleClassCostChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Max People:
              <input
                type="number"
                value={maxPpl}
                onChange={handleMaxPplChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Description:
              <input
                type="text"
                value={classDescription}
                onChange={handleClassDescriptionChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <label
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              Class Duration (Minutes):
              <input
                type="text"
                value={classDuration}
                onChange={handleClassDurationChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </label>
            <button
              style={{
                background: "#4CAF50",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1em",
                marginTop: "1em",
                marginRight: "1em",
              }}
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
          <button
            style={{
              background: "#d33",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              padding: "0.5em 1em",
              marginTop: "1em",
            }}
            onClick={close}
          >
            Close
          </button>
        </div>
      )}
    </Popup>
  );
}

export default UpdateClass;
