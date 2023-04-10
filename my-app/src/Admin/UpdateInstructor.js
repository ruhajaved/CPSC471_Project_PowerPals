import React, { useState, useContext } from "react";
import Popup from "reactjs-popup";
import { AdminContext } from "../Context/AdminContext";

function UpdateInstructor({ instructor, classTypes }) {
  const { AdminID } = useContext(AdminContext);
  const [firstName, setFirstName] = useState(instructor.First_Name);
  const [lastName, setLastName] = useState(instructor.Last_Name);
  const [address, setAddress] = useState(instructor.Address);
  const [email, setEmail] = useState(instructor.Email);
  const [gender, setGender] = useState(instructor.Gender);
  const [languages, setLanguages] = useState(instructor.Languages);
  const [isActive, setIsActive] = useState(instructor.Status_Active);
  const [classes, setClasses] = useState(instructor.classes_taught);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleLanguagesChange = (event) => {
    setLanguages(event.target.value);
  };

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked);
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

  const handleUpdate = (close) => {
    const updatedInstructor = {
      instructor: {
        first_name: firstName,
        last_name: lastName,
        address: address,
        email: email,
        gender: gender,
        languages: languages,
        status_active: isActive,
      },
      classes: classes,
    };

    fetch(
      `http://localhost:8000/api/admin/updateInstructor/${instructor.Instructor_ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json", admin: `${AdminID}` },
        body: JSON.stringify(updatedInstructor),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          Update Instructor
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
            Update Instructor
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
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
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
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
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
              Address:
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
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
              Gender:
              <input
                type="text"
                value={gender}
                onChange={handleGenderChange}
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
              Languages:
              <input
                type="text"
                value={languages}
                onChange={handleLanguagesChange}
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
              Status:
              <input
                type="checkbox"
                checked={isActive}
                onChange={handleIsActiveChange}
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
              Classes:
              <select
                multiple={true}
                onChange={handleClassesChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
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

export default UpdateInstructor;
