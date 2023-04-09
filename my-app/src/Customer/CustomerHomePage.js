import { useState, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";
import ClassList from "./ClassList";

function CustomerHomePage() {
  const [content, setContent] = useState("fitness_class"); // default to gym content
  const { CustomerID } = useContext(CustomerContext);

//Julie Code 
 // const [user, setUser] = useState({customerID: null});

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const renderContent = () => {
    switch (content) {
      case "fitness_class":
        return (
          <div> 
              < ClassList />            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
        {CustomerID === null ?                      // WHAT IS THIS? SHOULDN'T THIS BE MEMBERSHIP ID?
        <button
          style={{
            backgroundColor: "blue",
            border: "none",
            fontSize: "16px",
            margin: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
          //onClick={() => handleContentChange("gym")}
        >
          BUY MEMBERSHIP
        </button>
        :        
        <div> Customer No.: {CustomerID}</div>} 
        
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
            onClick={() => handleContentChange("fitness_class")}
          >
            View All Classes
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
export default CustomerHomePage;
