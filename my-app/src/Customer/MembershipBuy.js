import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import { CustomerContext } from "../Context/CustomerContext";

function MembershipBuy() {
  const [ creditCardNo, setCreditCardNo ] = useState("");
  const [ promoCode, setPromoCode ] = useState("");
  const [ tier, setTierChoice ] = useState("");
  const { CustomerID } = useContext(CustomerContext);

  const handleCreditChange = (event) => {
      setCreditCardNo(event.target.value);
  }

  const handlePromoCodeChange = (event) => {
      setPromoCode(event.target.value);
  }

  const handleTierChange = (event) => {
    setTierChoice(event.target.value);
  }

  const handleBuyMem = async (close) => {
    // Figure out how much membership costs based off of tier.
    var amount;
    if (tier === "Gold") amount = 100;
    else if (tier === "Silver") amount = 75;
    else amount = 50;

    const requestBody = {
      creditCardNo: creditCardNo,
      promoCode: promoCode,
      tier: tier,
      paymentAmount: amount,
    };
    const response = await fetch("http://localhost:8000/api/user/buyMembership", {
      method: "POST",
      headers: { "Content-Type": "application/json", customerId: `${CustomerID}` },
      body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
    .then((data) => { close(); console.log(data); })
    .catch((error) => console.error(error));
    // This refreshes the page
    window.location.reload(true);
  };

 
  return (
    <Popup
      trigger={<button
        style={{
          backgroundColor: "yellow",
          border: "none",
          fontSize: "16px",
          margin: "10px",
          padding: "10px",
          cursor: "pointer",
        }}
        >Purchase Membership</button>}          
      modal
      closeOnDocumentClick
      contentStyle={{
        background: "#1c1c1c",
        width: "80%",
        borderRadius: "15px",
        padding: "1em",
        border: "none",
      }}
      overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      {(close) => (
        <div className="popup">
          <h2 style={{ color: "#ffffff" }}>Buy Membership</h2>
          <form>
            <label style={{ color: "#ffffff" }}>
              Credit Card No:
              <input
                type="text"
                value={creditCardNo}
                onChange={handleCreditChange}
              />
            </label>
            <label style={{ color: "#ffffff" }}>
              Promo Code:
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
            </label>
            <label style={{ color: "#ffffff" }}>
              Membership Options:
              <select
                type="text"
                value={tier}
                onChange={handleTierChange} // Change the tier options shown to customer here
                >
                <option value=""></option>
                <option value="Gold">Gold - 20% off </option>
                <option value="Silver">Silver - 15% off </option>
                <option value="Bronze">Bronze - 10% off </option>  
                </select>             
            </label>
            <button
              type="button"
              style={{
                background: "#4CAF50",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1em",
                marginTop: "1em",
                marginRight: "1em",
              }}
              onClick={(event) => handleBuyMem(close)}
            >
              Buy
            </button>
            <button
              className="button"
              style={{
                background: "#d33",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5",
              }}
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default MembershipBuy;