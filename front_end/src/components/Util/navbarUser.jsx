import React, { Component } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Icon from "awesome-react-icons";

export const NavbarUser = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div style={{ width: "17%", backgroundColor: "#daa626" }}>
      <Navigation
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          history.push(itemId);
        }}
        items={[
          {
            title: "Robot Dashboard",
            itemId: "/userDashboard",
            elemBefore: () => <Icon name="activity" />,
          },
          {
            title: "Robot Control",
            itemId: '#',
            elemBefore: () => <Icon name="users" />,
            subNav: [
              {
                title: "Choose Robot",
                itemId: "/chooseRobot",
              },
              {
                title: "Service Operations",
                itemId: "/operations",
              },

            ],
          },
          {
            title: "Billing",
            // itemId: '/robots',
            elemBefore: () => <Icon name="radio" />,
            subNav: [
              // {
              //   title: "Robot Billing",
              //   itemId: "/robotBilling",
              // },
              {
                title: "Total Billing",
                itemId: "/userBilling",
              },
            ],
          },
          // {
          //   title: "State distribution",
          //   itemId: "/stateDistribution",
          //   elemBefore: () => <Icon name="lock" />,
          // },
          {
            title: "Logout",
            itemId: "/login",
            elemBefore: () => <Icon name="lock" />,
          },
        ]}
      />
    </div>
  );
};

export default { NavbarUser };
