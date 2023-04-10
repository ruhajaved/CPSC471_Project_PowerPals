import { useState, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";
import ClassList from "./ClassList";

function CustomerHomePage() {
  const [content, setContent] = useState("fitness_class"); // default to gym content
  const { CustomerID } = useContext(CustomerContext);

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
        case "buy_membership":
          return (
            <div> 
                < MembershipNo />            
            </div>
          );
      default:
        return null;
    }
  };

 //const { MembershipID } = findMembershipNo(CustomerID);


  return (
    <div>
        <div> 
            Customer No.: {CustomerID} <br/>
            Membership No.: '3' 
        </div>  
               
        <button
          style={{
            backgroundColor: "yellow",
            border: "none",
            fontSize: "16px",
            margin: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleContentChange("buy_membership")}
        >
          BUY MEMBERSHIP
        </button>
        

        
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
          
{/* JULIE CODE */}
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleContentChange("buy_membership")}
          >
            MeowMeow
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
export default CustomerHomePage;
