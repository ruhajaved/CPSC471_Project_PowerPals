import { useState } from "react";
import GymList from "./GymList";
import AddGym from "./AddGym";
import InstructorList from "./InstructorList";
import AddInstructor from "./AddInstructor";
import ClassList from "./ClassList";
import AddClass from "./AddClass";
import ClassTypeList from "./ClassTypeList";

function AdminHomePage() {
  const [content, setContent] = useState("gym"); // default to gym content

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const renderContent = () => {
    switch (content) {
      case "gym":
        return (
          <div>
            <AddGym />
            <GymList />
          </div>
        );
      case "instructor":
        return (
          <div>
            <AddInstructor />
            <InstructorList />
          </div>
        );
      case "class":
        return (
          <div>
            <AddClass />
            <ClassList />
          </div>
        );
      case "classtype":
        return (
          <div>
            <ClassTypeList />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            height: "100vh",
            width: "15%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleContentChange("gym")}
          >
            Gyms
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleContentChange("instructor")}
          >
            Instructors
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleContentChange("class")}
          >
            Classes
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleContentChange("classtype")}
          >
            Class Types
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminHomePage;
