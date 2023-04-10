import React, { useState, useEffect, useContext } from "react";
import { CustomerContext } from "../Context/CustomerContext";

function MembershipBuy() {
  const { CustomerID } = useContext(CustomerContext);
  const [members, setMembershipNo] = useState([]);

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
      setMembershipNo(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      MEOW MEOW
    </div>
  )
}

export default MembershipBuy;