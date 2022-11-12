import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { Redirect } from "react-router";
import { UserSidebar } from "../Util/UserLayout";
import roboImage from "../Util/roboImage.jpeg";

class RobotStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: []
        };
    }
    componentDidMount() {
        axios
            .get(backend + "/api/robots/allRegRobots", {
                params: {
                    user_id: localStorage.getItem('user_Id')
                }
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.data) {
                    this.setState({ robots: response.data })
                }
            });
    }

    render() {
        let robots = this.state.robots.map(
            robot => {
                return (
                    <div class="col-sm-4 o">
                        <div class="card2">
                            <div class="wrapper">
                                <img
                                    src={roboImage}
                                    class="image--cover2"
                                ></img>
                            </div>
                            <h2>Robot id: {robot.roboId}  </h2>
                            <br />
                            <h2>Robot State: {robot.roboState} </h2>
                            <br />
                            <h2>Robot Name: {robot.roboName} </h2>
                            <br />
                            <h2>Run Time: {robot.runTime} </h2>
                        </div>
                    </div>
                );
            }
        );
        return (
            <div>
                <UserSidebar>
                    <br />
                    <h2 style={{ marginLeft: "10%",fontSize: "26px",fontWeight: 'bold'}}>Your Registered Robots</h2>
                    <div className="row">
                        {robots}
                    </div>
                </UserSidebar>
            </div >
        );
    }
}

export default RobotStatus;
