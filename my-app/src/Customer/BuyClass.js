import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import { CustomerContext } from "../Context/CustomerContext";

function BuyClass(eachClass) {
    const [ creditCardNo, setCreditCardNo ] = useState("");
    const [ promoCode, setPromoCode ] = useState("");
    const { CustomerID, MembershipTier } = useContext(CustomerContext);
    const [success, setSuccess] = useState(false);

    const handleCreditChange = (event) => {
        setCreditCardNo(event.target.value);
    }

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    }

    const handleBuy = (close) => {
        // if credit card no is empty, do not allow user to pay for class
        if (creditCardNo === "") {return;}

        const requestBody = {
          classId: eachClass.eachClass.Class_ID,
          paymentAmount: eachClass.eachClass.Class_Cost,
          creditCardNo: creditCardNo,
          promoCode: promoCode,
          tier: MembershipTier
        };
        fetch("http://localhost:8000/api/user/buyClass", {
          method: "POST",
          headers: { "Content-Type": "application/json", customerId: `${CustomerID}` },
          body: JSON.stringify(requestBody),
        })
          .then((response) => response.json())
          .then((data) => { 
                            setSuccess(true); 
                            setTimeout(() => {window.location.reload();}, 3000);
                            console.log(data); })
          .catch((error) => console.error(error));
    };

    return (
        <Popup
          trigger={<button>Buy Class</button>}
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
              <h2 style={{ color: "#ffffff" }}>Buy Class</h2>
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
                  onClick={(event) => handleBuy(close)}
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
                  close
                </button>
                {success && (
                  <h3
                    style={{
                      color: "green",
                      backgroundColor: "lightgreen",
                      padding: "10px",
                    }}
                  >
                    Class Added! Please see Class Payment for Confirmation.
                  </h3>
                )}
              </form>
            </div>
          )}
        </Popup>
      );
}

export default BuyClass;