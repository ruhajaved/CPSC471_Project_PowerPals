import { useState } from "react";

function CustomerHomePage() {
  const [content, setContent] = useState(null); // double check this

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const renderContent = () => {
    return;
  };

  return (
    <div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            //onClick={() => handleContentChange("gym")}
          >
            customer
          </button>
    </div>
  );
}

export default CustomerHomePage;
