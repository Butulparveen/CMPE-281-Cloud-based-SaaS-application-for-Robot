import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./login-module/login";
import { NavbarDefault } from "./Util/NavbarDefault";
import { RegisterPage } from "./login-module/register";
import { Provider } from "react-redux";
import HomePage from "./Dashboard/dashboard";
import UserDashboard from "./UserDashboard/userdashboard";
import ActiveUsers from "./Users/ActiveUsers";
import RegisteredUsers from "./Users/RegisteredUsers";
import RegisteredRobots from "./Robots/registeredRobots";
import ActiveRobots from "./Robots/activeRobots";
import ActiveUserRobots from "./Robots/activeUserRobots";
import CreateRobot from "./Robots/createRobots";
import ChooseRobot from "./Robots/chooseRobots";
import RobotStatus from "./Robots/robotStatus";
import AdminStateDistribution from "./StateDistribution/adminStateDistribution";
import MoveRobot from "./Robots/moveRobot";
import MoveARobot from "./Robots/moveARobot";
import RobotPath from "./Robots/robotPath";
import PlotRobotPath from "./Robots/plotRobotPath";
import UserBilling from "./Billing/userBilling";
import AdminBilling from "./Billing/adminBilling";
import TempDistri from "./StateDistribution/tempDistri";
import TempDistriUser from "./StateDistribution/tempDistriUser";
import PlotAdminRobotPath from "./Robots/plotAdminRobotPath"

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={NavbarDefault} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/dashboard" component={HomePage} />
                <Route path="/userdashboard" component={UserDashboard} />
                <Route path="/registeredUsers" component={RegisteredUsers} />
                <Route path="/activeUsers" component={ActiveUsers} />
                <Route path="/registeredRobots" component={RegisteredRobots} />
                <Route path="/activeRobots" component={ActiveRobots} />
                <Route path="/activeUserRobots" component={ActiveUserRobots} />
                <Route path="/stateDistribution" component={AdminStateDistribution} />
                <Route path="/tempDistri" component={TempDistri} />
                <Route path="/tempDistriUser" component={TempDistriUser} />
                <Route path="/operations" component={MoveRobot} />
                <Route path="/chooseRobot" component={ChooseRobot} />
                <Route path="/createRobot" component={CreateRobot} />
                <Route path="/robotStatus" component={RobotStatus} />
                <Route path="/moveARobot" component={MoveARobot} />
                <Route path="/robotPath" component={RobotPath} />
                <Route path="/plotRobotPath" component={PlotRobotPath} />
                <Route path="/userBilling" component={UserBilling} />
                <Route path="/adminBilling" component={AdminBilling} />
                <Route path="/navigation" render={() => { window.open("./robot_controller.html"); }} />
                <Route path = "/plotAdminRobotPath" component = {PlotAdminRobotPath}/>

            </div>
        );
    }
}

export default Main;
