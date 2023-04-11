import React, { useContext } from "react";
import AdminLogin from "./Admin/AdminLogin";
import AdminHomePage from "./Admin/AdminHomePage";
import { AdminContext } from "./Context/AdminContext";
import { CustomerContext } from "./Context/CustomerContext";
import CustomerHomePage from "./Customer/CustomerHomePage";
import Login from "./Login";
import CustomerLogin from "./Customer/CustomerLogin";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";

function Main() {
  const { AdminID } = useContext(AdminContext);
  const { CustomerID } = useContext(CustomerContext);
  let routes;
  console.log(AdminID);
  console.log(CustomerID);
  if (AdminID !== null) {
    console.log("ADMIN");
    routes = (
      <React.Fragment>
        <Route path="*" element={<AdminHomePage />} />
      </React.Fragment>
    );
  } else if (CustomerID !== null) {
    console.log("CUSTOMER");
    routes = (
      <React.Fragment>
        <Route path="*" element={<CustomerHomePage />} />
      </React.Fragment>
    );
  } else {
    console.log("WE GOOD");
    routes = (
      <React.Fragment>
        <Route path="*" element={<Login />} />
      </React.Fragment>
    );
  }
  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
}

export default Main;
