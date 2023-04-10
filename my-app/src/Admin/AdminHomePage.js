import GymList from "./GymList";
import InstructorList from "./InstructorList";
import AddGym from "./AddGym";
import { useState } from "react";
import AddInstructor from "./AddInstructor";

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
      case "classes":
        return (
          <div>

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
            onClick={() => handleContentChange("classes")}
          >
            Classes
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminHomePage;
