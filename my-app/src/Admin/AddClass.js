import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function AddClass() {
  const { AdminID } = useContext(AdminContext);

  const [classInfo, setClassInfo] = useState({
    Class_Name: "",
    Class_Date: "",
    Class_Time: "",
    Class_Cost: 0,
    No_of_Max_Ppl: 0,
    Class_Description: "",
    Class_Duration: 0,
    Gym_ID: null,
    Studio_Room_No: "",
    Class_Category: "",
    Instructor_ID: null,
    Admin_ID: AdminID,
  });
  const [gyms, setGyms] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [selectedGym, setSelectedGym] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedStudioRoom, setSelectedStudioRoom] = useState(null);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchInstructorData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllInstructors",
        {
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      setInstructors(data);
      console.log(data);
    };
    const fetchGymData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/admin/getAllGyms",
        {
          headers: {
            admin: `${AdminID}`,
          },
        }
      );
      const data = await response.json();
      setGyms(data);
    };
    const fetchClassTypeData = async () => {
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
      console.log(data);
    };
    fetchInstructorData();
    fetchGymData();
    fetchClassTypeData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setClassInfo({ ...classInfo, [name]: value });
  };

  const handleStudioRoomChange = (event) => {
    const { value } = event.target;
    setClassInfo({
      ...classInfo,
      Studio_Room_No: value,
    });
    setSelectedStudioRoom(value);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setClassInfo({
      ...classInfo,
      Class_Category: value,
    });
    setSelectedClassType(value);
  };

  const handleGymChange = (event) => {
    const gymIndex = gyms.find((gym) => gym.name === event.target.value);
    setClassInfo({
      ...classInfo,
      Gym_ID: gymIndex.gymId,
    });
    setSelectedGym(gymIndex);
  };

  const handleInstructorChange = (event) => {
    const { value } = event.target;
    setClassInfo({
      ...classInfo,
      Instructor_ID: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      classInfo,
    };
    console.log(requestBody);

    if (
      classInfo.Admin_ID === "" ||
      classInfo.Class_Category === "" ||
      classInfo.Class_Cost === 0 ||
      classInfo.Class_Date === "" ||
      classInfo.Class_Description === "" ||
      classInfo.Class_Duration === 0 ||
      classInfo.No_of_Max_Ppl === 0 ||
      classInfo.Gym_ID === null ||
      classInfo.Instructor_ID === null ||
      classInfo.Studio_Room_No === "" ||
      classInfo.Class_Time === ""
    ) {
      console.log("Input error");
      return;
    }
    // make POST request using the requestBody
    fetch("http://localhost:8000/api/admin/createClass", {
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
      <h3 style={{ marginBottom: "5px" }}>Add Class:</h3>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Class Name:
        <input
          type="text"
          name="Class_Name"
          value={classInfo.Class_Name}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Class Date:
        <input
          type="date"
          name="Class_Date"
          value={classInfo.Class_Date}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Class Time:
        <input
          type="time"
          name="Class_Time"
          value={classInfo.Class_Time}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Cost:
        <input
          type="number"
          name="Class_Cost"
          value={classInfo.Class_Cost}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Number of Max People:
        <input
          type="number"
          name="No_of_Max_Ppl"
          value={classInfo.No_of_Max_Ppl}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Description:
        <input
          type="text"
          name="Class_Description"
          value={classInfo.Class_Description}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Duration (Minutes):
        <input
          type="number"
          name="Class_Duration"
          value={classInfo.Class_Duration}
          onChange={handleInputChange}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Gym:
        <select
          onChange={handleGymChange}
          value={selectedGym ? selectedGym.name : ""}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        >
          <option value={""} key="NOT_POSSIBLE">
            {"Select a Gym"}
          </option>
          {gyms.map((gym) => (
            <option key={gym.Gym_ID} value={gym.Gym_ID}>
              {gym.name}
            </option>
          ))}
        </select>
      </label>
      {selectedGym && (
        <label style={{ display: "block", marginBottom: "10px" }}>
          Studio Room:
          <select
            onChange={handleStudioRoomChange}
            value={selectedStudioRoom ? selectedStudioRoom.name : ""}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
          >
            <option value={""} key="NOT_POSSIBLE">
              {"Select a Studio Room"}
            </option>
            {selectedGym.studios.map((studio) => (
              <option key={studio.roomNo} value={studio.roomNo}>
                {studio.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Class Category:
        <select
          onChange={handleCategoryChange}
          value={classInfo.Class_Category || ""}
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
        >
          <option value={""} key="NOT_POSSIBLE">
            {"Select a Class Type"}
          </option>
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
      {selectedClassType && (
        <label style={{ display: "block", marginBottom: "10px" }}>
          Instructor:
          <select
            onChange={handleInstructorChange}
            value={classInfo.Instructor_ID || ""}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
          >
            <option value={""} key="NOT_POSSIBLE">
              {"Select an Instructor"}
            </option>
            {instructors
              .filter((instructor) =>
                instructor.classes_taught.includes(selectedClassType)
              )
              .map((instructor) => (
                <option
                  key={instructor.Instructor_ID}
                  value={instructor.Instructor_ID}
                >
                  {instructor.First_Name + " " + instructor.Last_Name}
                </option>
              ))}
          </select>
        </label>
      )}
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
          Successfully Added Class! Page will refresh shortly.
        </h3>
      )}
    </form>
  );
}

export default AddClass;
