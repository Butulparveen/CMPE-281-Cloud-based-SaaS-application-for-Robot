import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import LineChart from './LineChart.jsx'

class PlotRobotPath extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robot: [],
            data: []
        };
    }

    renderTableData() {
        return this.state.data.map((student, index) => {
            return (
                <tr key={student.id} style={{ borderColor: "black", borderWidth: "1px", padding: "20px" }}>
                    <td style={{ borderColor: "black", borderWidth: "1px", padding: "20px" }}>{student.x}</td>
                    <td style={{ borderColor: "black", borderWidth: "1px", padding: "20px" }}>{student.y}</td>
                </tr>
            )
        })
    }

    componentDidMount() {
        axios
            .get(backend + "/api/robots/getRobot", {
                params: {
                    robotId: this.props.location.state
                }
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                let data = []
                if (response.data) {
                    this.setState({ robot: response.data })
                    let roboPath = response.data.roboPath
                    for (let element = 0; element < roboPath.length; element++) {
                        const path = roboPath[element]
                        console.log("path::: ", path)
                        const obj = {
                            x: path.x,
                            y: path.y,
                            id: path.oid
                        }
                        data.push(obj)
                    }
                    this.setState({ data: data })

                }
            });
    }

    render() {
        let graph;

        return (
            <div>
                <UserSidebar>
                    <br />
                    <div>
                        <h1 id='title' style={{ fontSize: "26px", marginLeft: "40px",fontWeight: 'bold' }}>Robot Path : {this.state.robot.roboName}</h1>
                        <br />
                        <table id='students' style={{ marginLeft: "20%" }}>
                            <tr key="heading" style={{ borderColor: "black", borderWidth: "1px", padding: "20px",fontWeight: 'bold',fontSize: "22px" }}>
                                <td style={{ borderColor: "black", borderWidth: "1px", padding: "20px" }}>x co-ordinate</td>
                                <td style={{ borderColor: "black", borderWidth: "1px", padding: "20px" }}>y co-ordinate</td>
                            </tr>
                            <tbody style={{ borderColor: "black", borderWidth: "1px" }}>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </UserSidebar>
            </div >
        );
    }
}

export default PlotRobotPath;
