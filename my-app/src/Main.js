import React, { useContext } from "react";
import AdminLogin from "./Admin/AdminLogin";
import AdminHomePage from "./Admin/AdminHomePage";
import { AdminContext } from "./Context/AdminContext";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";

function Main() {
  const { AdminID } = useContext(AdminContext);
  let routes;
  console.log(AdminID);
  if (AdminID) {
    routes = (
      <React.Fragment>
        <Route path="*" element={<AdminHomePage />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="*" element={<AdminLogin />} />
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
