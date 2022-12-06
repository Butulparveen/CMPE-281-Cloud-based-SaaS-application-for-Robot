import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { Sidebar } from "../Util/Layout";
import roboImage from "../Util/roboImage.jpeg";
import { Bar, Line, Pie } from "react-chartjs-2";

class TempDistri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: [],
            activeRobots: 0,
            inActiveRobots: 0,
            connectedRobots: 0,
            stoppedRobots: 0,
            operatedRobots:0,
            chartData: [],
        };
    }
    componentDidMount() {
        axios
            .get(backend + "/api/robots/allRegRobots", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async response => {
                if (response.data) {
                    response.data.map(async (robo) => {
                        if (robo.roboState.toLowerCase() === "active") {
                            this.setState({ activeRobots: this.state.activeRobots + 1 })
                        }
                        else if (robo.roboState.toLowerCase() === "inactive") {
                            this.setState({ inActiveRobots: this.state.inActiveRobots + 1 })
                        }
                        else if (robo.roboState.toLowerCase() === "connected") {
                            this.setState({ connectedRobots: this.state.connectedRobots + 1 })
                        }else if (robo.roboState.toLowerCase() === "operated") {
                            this.setState({ operatedRobots: this.state.operatedRobots + 1 })
                        } else {
                            this.setState({ stoppedRobots: this.state.stoppedRobots + 1 })
                        }
                        var labels = [];
                        var data = [];
                        var backgroundColor = [];

                        labels.push("Active Robots");
                        data.push(this.state.activeRobots);
                        backgroundColor.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");

                        labels.push("Inactive Robots");
                        data.push(this.state.inActiveRobots);
                        backgroundColor.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");

                        labels.push("Connected Robots");
                        data.push(this.state.connectedRobots);
                        backgroundColor.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");

                        labels.push("Operated Robots");
                        data.push(this.state.operatedRobots);
                        backgroundColor.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");

                        labels.push("Stopped Robots");
                        data.push(this.state.stoppedRobots);
                        backgroundColor.push("rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");

                        var state = {};
                        var datasets = [];
                        state.labels = labels;
                        var x = {};
                        x.label = "State Distribution";
                        x.data = data;
                        x.backgroundColor = backgroundColor;
                        datasets.push(x);
                        state.datasets = datasets;
                        this.setState({
                            chartData: state,
                        });
                    })
                }
            });
    }

    render() {
        console.log("chartData", this.state.chartData)
        let graph = (
            <div style={{ marginLeft: "20%", marginRight: "20%" }}>
                <Pie
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: "State Distribution",
                            text: "State Distribution Graph",
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
                <br />
                {graph}
                <br />
                <div style={{ marginLeft: "50px", marginRight: "50px", backgroundColor: "#ffc107" }}>
                    <table class="table">
                        <tbody style={{verticalalign: 'top',color: '#0b1118'}} >
                            <tr>
                                <th scope="col">No of Active robots</th>
                                <th scope="col">{this.state.activeRobots}</th>
                            </tr>
                            <tr>
                                <th scope="col">No of Inactive robots</th>
                                <th scope="col">{this.state.inActiveRobots}</th>
                            </tr>
                            <tr>
                                <th scope="col">No of Connected robots</th>
                                <th scope="col">{this.state.connectedRobots}</th>
                            </tr>
                            <tr>
                                <th scope="col">No of Operated robots</th>
                                <th scope="col">{this.state.operatedRobots}</th>
                            </tr>
                            <tr>
                                <th scope="col">No of Stopped robots</th>
                                <th scope="col">{this.state.stoppedRobots}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <br />

            </div >
        );
    }

    // render() {
	// 	const options = {
	// 		animationEnabled: true,
	// 		exportEnabled: true,
	// 		theme: "dark2", // "light1", "dark1", "dark2"
	// 		title:{
	// 			text: "Trip Expenses"
	// 		},
	// 		data: [{
	// 			type: "pie",
	// 			indexLabel: "{label}: {y}%",		
	// 			startAngle: -90,
	// 			dataPoints: [
	// 				{ y: 20, label: "Airfare" },
	// 				{ y: 24, label: "Food & Drinks" },
	// 				{ y: 20, label: "Accomodation" },
	// 				{ y: 14, label: "Transportation" },
	// 				{ y: 12, label: "Activities" },
	// 				{ y: 10, label: "Misc" }	
	// 			]
	// 		}]
	// 	}
		
	// 	return (
	// 	<div>
	// 		<CanvasJSChart options = {options} 
	// 			/* onRef={ref => this.chart = ref} */
	// 		/>
	// 		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
	// 	</div>
	// 	);
	// }
}

export default TempDistri;
