import React from "react";

import { Sidebar } from "../Util/Layout";
import { useSelector } from "react-redux";
import roboImage from "../Util/cloudrobo.jpeg";
import UserDashboard from "../UserDashboard/userdashboard";
import AdminStateDistribution from "../StateDistribution/adminStateDistribution";
import TempDistri from "../StateDistribution/tempDistri";

const HomePage = () => {
  let UserDetails = {};
  const user = useSelector((state) => state.authentication.user);
  if (!localStorage.getItem("user_fn")) {
    console.log("UserDetails", UserDetails);
    UserDetails = user.data.payload[0];
    localStorage.setItem("user_fn", UserDetails.first_name);
    localStorage.setItem("user_ln", UserDetails.last_name);
    localStorage.setItem("user_Id", UserDetails.user_id);
    localStorage.setItem("user_role", UserDetails.role);
  }
  return (
    <Sidebar>
      <br />
      <TempDistri />
    </Sidebar>
  );
};

export default HomePage;
