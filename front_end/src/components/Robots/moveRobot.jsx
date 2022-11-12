import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import roboImage from "../Util/robo3.jpeg";
import { history } from '../Util/history';

class MoveRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: []
    };
  }
  chooseRobot = (e, id) => {
    history.push('/moveARobot', id);
  }

  componentDidMount() {
    axios
      .get(backend + "/api/robots/getOperationsInfo", {
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
    let robots;
    if (this.state.robots.length > 0) {
      robots = this.state.robots.map(
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
                <h2>Service Operations: {robot.serviceOperations}</h2>
                <br />
              </div>
            </div>
          );
        }
      );

    } else {
      robots = <div style={{ marginLeft: "20%", marginTop: "20%", fontWeight: "bold" }}> You dont have any service Operations yet</div>
    }

    return (
      <div>
        <UserSidebar>
          <br />
          <h2 style={{ marginLeft: "10%", fontSize: "20px" }}> Service operations</h2>
          <div className="row">
            {robots}
          </div>
        </UserSidebar>
      </div >
    );
  }
}

export default MoveRobot;
