import { CustomerContext } from "../Context/CustomerContext";
import ClassList from "./ClassList";
import MembershipBuy from "./MembershipBuy";
import React, { useState, useEffect, useContext } from "react";

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
                < MembershipBuy />            
            </div>
          );
      default:
        return null;
    }
  };
  const [member, setMember] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/user/getMembership",
        {
          headers: {
            customerId: `${CustomerID}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMember(data);
    };
    fetchData();
    console.log(member)
    console.log(member)
  }, []);

  return (
    <div>
      <div> 
        Customer No.: <br/>
        {CustomerID} <br/>
        Membership No.: {member?.Membership_ID}
      </div>

      <button
        style={{ // This is the Buy membership Button 
          backgroundColor: "yellow",
          border: "none",
          fontSize: "16px",
          margin: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
        // If we want the button to be UNCLICKABLE - use this code 
        //onClick={(e) => member !== null ? e.preventDefault():handleContentChange("buy_membership")}
        // If we want button to take us to "Buy Membership", use this code
        onClick={() => handleContentChange("buy_membership")}>
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
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
export default CustomerHomePage;
