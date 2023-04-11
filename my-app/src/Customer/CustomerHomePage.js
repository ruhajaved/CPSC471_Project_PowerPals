import { CustomerContext } from "../Context/CustomerContext";
import ClassList from "./ClassList";
import MembershipBuy from "./MembershipBuy";
import React, { useState, useEffect, useContext } from "react";

function CustomerHomePage() {
  const [content, setContent] = useState("fitness_class");
  const { CustomerID, MembershipID, MembershipTier, trackMembership } = useContext(CustomerContext);
  const [member, setMember] = useState(null);

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
      if (data === {}) return;                  // HOW DO I GET THIS TO WORK?
      trackMembership(data.Membership_ID, data.Tier);
      setMember(data);
    };
    fetchData();
  }, [] );


  const conditionalRenderMembership = () => {
    if (MembershipID == null) {
      console.log("here2");
      return (
        <MembershipBuy></MembershipBuy>
      )
    }
  }

  return (
    <div>
      <div> 
        Membership No.:  {MembershipID} <br/>
        Tier Level:   {MembershipTier} <br/>
        {conditionalRenderMembership()}
      </div>
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
