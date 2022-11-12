import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import { Bar, Line, Pie } from "react-chartjs-2";

class UserBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billing: [],
    };
  }
  componentDidMount() {
    console.log("UI", localStorage.getItem('user_Id'))
    axios
      .get(
        backend + "/api/robots/robotsByUser",
        {
          params: {
            userId: localStorage.getItem("user_Id"),
          },
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
      data.push((order.runTime * (1 / 60)).toFixed(2));
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
    let robotTable = billing.map((robot) => {
      total = total + robot.runTime * (1 / 60);
      return (
        <tr>
          <td>{robot.roboId}</td>
          <td>{robot.roboName}</td>
          <td>{robot.runTime}</td>
          <td>{((robot.runTime * (1 / 60))).toFixed(2)}</td>
        </tr>
      );
    });
    return (
      <div>
        <UserSidebar>
          <br />
          <br />
          {graph}
          <br />
          <div style={{ marginLeft: "30px", marginRight: "30px", backgroundColor: "rgb(255, 193, 7)" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Robot Id</th>
                  <th scope="col">Robot Name</th>
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
        </UserSidebar>
      </div>
    );
  }
}

export default UserBilling;
