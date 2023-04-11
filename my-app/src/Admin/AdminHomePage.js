import { useState, useContext } from "react";
import GymList from "./GymList";
import AddGym from "./AddGym";
import InstructorList from "./InstructorList";
import AddInstructor from "./AddInstructor";
import ClassList from "./ClassList";
import AddClass from "./AddClass";
import ClassTypeList from "./ClassTypeList";
import AddClassType from "./AddClassType";
import { AdminContext } from "../Context/AdminContext";

function AdminHomePage() {
  const [content, setContent] = useState("gym"); // default to gym content
  const { logout } = useContext(AdminContext);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const logoutAdmin = () => {
    logout();
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
            <AddClassType />
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
          <button
            style={{
              backgroundColor: "#ff3366",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "5px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => logoutAdmin()}
          >
            Logout
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminHomePage;
