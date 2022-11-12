import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
// import { Sidebar } from "../Util";
import { Sidebar } from "../Util/Layout";
import { Bar, Line, Pie } from "react-chartjs-2";

class AdminBilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billing: [],
            chartData: []
        };
    }
    componentDidMount() {
        axios
            .get(
                backend + "/api/robots/robotsByUser",
                {
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.data) {
                    this.setState({ billing: response?.data });
                }
            });
    }

    render() {
        let billing = this.state.billing;
        let total = 0;
        var labels = [];
        var data = [];
        var backgroundColor = [];
        billing.map((order) => {
            var dynamicColors = function () {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            labels.push(order.roboId);
            data.push((order.runTime * (1 / 60)) .toFixed(2));
            backgroundColor.push(dynamicColors());
        });
        var state = {};
        var datasets = [];
        state.labels = labels;
        var x = {};
        x.label = "Billing amount($)";
        x.data = data;
        x.backgroundColor = backgroundColor;
        datasets.push(x);
        state.datasets = datasets;
        let robotTable = billing.map((robot) => {
            total = total + robot.runTime * (1 / 60);
            return (
                <tr>
                    <td>{robot.roboId}</td>
                    <td>{robot.userId}</td>
                    <td>{Math.round(robot.runTime)}</td>
                    <td>{(robot.runTime * (1 / 60)).toFixed(2)}</td>
                </tr>
            );
        });
        let graph = (
            <div style={{ marginLeft: "20%", marginRight: "20%" }}>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: "State Distribution",
                            text: "Billing Details",
                            fontSize: 25,
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
                <br />
                <br />
            </div>
        );
        return (
            <div>
                <Sidebar>
                    <br />
                    {graph}
                    <br />
                    <div style={{ marginLeft: "30px", marginRight: "30px", backgroundColor: "#D6EAF8" }}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Robot Id</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Runtime (seconds)</th>
                                    <th scope="col">Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {robotTable}
                                <tr>
                                    <th scope="col">Total Billing Amount</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">${(Math.round(total * 100) / 100).toFixed(2)}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

export default AdminBilling;
