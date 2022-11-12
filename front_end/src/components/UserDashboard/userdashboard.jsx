import React from "react";

import { UserSidebar } from "../Util/UserLayout";
import { useSelector } from "react-redux";
import roboImage from "../Util/cloudrobo.jpeg";
import TempDistriUser from "../StateDistribution/tempDistriUser";

const UserDashboard = () => {
  let UserDetails = {};
  const user = useSelector((state) => state.authentication.user);
  console.log("Userrr", user);
  if (!localStorage.getItem("user_fn")) {
    UserDetails = user.data.payload[0];
    localStorage.setItem("user_fn", UserDetails.first_name);
    localStorage.setItem("user_ln", UserDetails.last_name);
    localStorage.setItem("user_role", UserDetails.role);
    localStorage.setItem("user_Id", UserDetails.user_id);
  }
  return (
    <UserSidebar>
      <div>
        <br />
        <TempDistriUser />
      </div>
    </UserSidebar >
  );
};

export default UserDashboard;
