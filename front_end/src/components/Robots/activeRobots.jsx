import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { Sidebar } from "../Util/Layout";
import roboImage from "../Util/roboImage.jpeg";

class ActiveRobots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: []
        };
    }
    componentDidMount() {
        axios
            .get(backend + "/api/robots/allActiveRobots", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log("Robots", response)
                if (response.data) {
                    this.setState({ robots: response.data })
                }
            });
    }

    render() {
        let robots = this.state.robots.map(
            robot => {
                return (
                    <div class="col-sm-4 o"style={{width: '25%',backgroundcolor: 'rgb(85 185 234)'}}>
                        <div class="card2"style={{width: '25%',backgroundcolor: 'rgb(85 185 234)'}}>
                            <div class="wrapper">
                                <img
                                    src={roboImage}
                                    class="image--cover2"
                                ></img>
                            </div >
                            <h2>Robot id: {robot.roboId}  </h2>
                            <br />
                            <h2>Robot State: {robot.roboState} </h2>
                            <br />
                            <h2>Run Time: {robot.runTime} </h2>
                        </div>
                    </div>
                );
            }
        );
        return (
            <div>
                <Sidebar>
                    <br />
                    <h2 style={{ marginLeft: "10%", fontSize: "20px",color:'black',fontWeight: 'bold' }}> Active Robots</h2>
                    <div className="row">
                        {robots}
                    </div>
                </Sidebar>
            </div >
        );
    }
}

export default ActiveRobots;
