import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { Redirect } from "react-router";
import { Sidebar } from "../Util/Layout";
import roboImage from "../Util/robo3.jpeg";
import Button from '@material-ui/core/Button';
import { history } from '../Util/history';


class RegisterdRobots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: []
        };
    }
    chooseRobotPATH = (e, id) => {
        history.push("/plotAdminRobotPath", id)
    }
    componentDidMount() {
        axios
            .get(backend + "/api/robots/allRegRobots", {
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
                            <h2>Run Time: {robot.runTime} </h2>
                            <Button size="medium" color="primary" onClick={e => this.chooseRobotPATH(e, robot._id)}>
                                    Path
                            </Button>
                            <Button onClick={()=> history.push("/moveARobot")}>Play</Button>
                        </div>
                    </div>
                );
            }
        );
        return (
            <div>
                <Sidebar>
                    <br />
                    <h2 style={{ marginLeft: "10%", fontSize: "26px",fontWeight: 'bold'}}>Your Registered Robots For Robot Cloud Food Delivery</h2>
                    <div className="row">
                        {robots}
                    </div>
                </Sidebar>
            </div >
        );
    }
}

export default RegisterdRobots;
