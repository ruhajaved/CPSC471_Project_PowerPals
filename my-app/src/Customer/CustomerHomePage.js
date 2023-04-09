

import SeeClasses from "./SeeClasses";
import SeeAllGyms from "./SeeAllGyms";

import { useState } from "react";


function CustomerHomePage() {
  const [content, setContent] = useState(null); // default to gym content

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const renderContent = () => {
    switch (content) {
      case "gym":  // THIS IS THE LEFT HEADER
        return (
          <div>

          </div>
          // TYPE IN THE "FUNCTIONS HERE"     <AddInstructor />
        );
      case "fitness_class": // THIS IS THE LEFT HEADER
        return (
          <div> 
              < SeeClasses />            
          </div>
          // TYPE IN THE "FUNCTIONS HERE"     <AddInstructor />
        );
        case "membership": // THIS IS THE LEFT HEADER
        return (
          <div> 
              < SeeAllGyms />
            
          </div>
          // TYPE IN THE "FUNCTIONS HERE"     <AddInstructor />
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
            View All Gyms
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
            onClick={() => handleContentChange("fitness_class")}
          >
            View All Classes
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
            onClick={() => handleContentChange("membership")} // SIGN UP FOR MEMBERSHIP HERE
          >
            Sign Up For Membership            
          </button> 
          

          
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
export default CustomerHomePage;
