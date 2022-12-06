import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import { history } from "../Util/history";

class MoveARobot extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      robot: [],
      x: 0,
      y: 0,
    };
  }
  fetchRobot() {
    axios
      .get(
        backend + "/api/robots/getRobot",
        {
          params: {
            robotId: this.props.location?.state?.roboId,
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
          this.setState({ robot: response.data });
          var roboPath = this.state.robot.roboPath;
          var roboPathLength = this.state.robot.roboPath.length;
          this.setState({ x: roboPath[roboPathLength - 1].x });
          this.setState({ y: roboPath[roboPathLength - 1].y });
        }
      });
  }
  moveRobot = (e, id) => {
    history.push("/moveARobot", id);
  };
  changeStatus = (e) => {
    const data = {
      roboState:
        this.state.robot.roboState === "Active" ? "InActive" : "Active",
      id: this.props.location.state.roboId,
      timeStamp: new Date(),
    };
    axios
      .post(backend + "/api/robots/changeRobotStatus", data)
      .then((response) => {
        if (response.data) {
          this.fetchRobot();
        }
      });
  };
  moveup = (e) => {
    const data = {
      x: this.state.x,
      y: this.state.y + 1,
      id: this.props.location.state.roboId,
    };
    axios
      .post(backend + "/api/robots/changeRobotPath", data)
      .then((response) => {
        if (response.data) {
          this.fetchRobot();
        }
      });
  };
  moveDown = (e) => {
    let data = {
      x: this.state.x,
      y: this.state.y - 1,
      id: this.props.location.state.roboId,
    };
    axios
      .post(backend + "/api/robots/changeRobotPath", data)
      .then((response) => {
        if (response.data) {
          this.fetchRobot();
        }
      });
  };
  moveLeft = (e) => {
    let data = {
      x: this.state.x - 1,
      y: this.state.y,
      id: this.props.location.state.roboId,
    };
    axios
      .post(backend + "/api/robots/changeRobotPath", data)
      .then((response) => {
        if (response.data) {
          this.fetchRobot();
        }
      });
  };
  moveRight = (e) => {
    let data = {
      x: this.state.x + 1,
      y: this.state.y,
      id: this.props.location.state.roboId,
    };
    axios
      .post(backend + "/api/robots/changeRobotPath", data)
      .then((response) => {
        if (response.data) {
          this.fetchRobot();
        }
      });
  };

  componentDidMount() {
    console.log("Updateddd");
    this.fetchRobot();
  }

  render() {
    return (
      <div>
        <UserSidebar>
          <div class="card2">
            <div class="row" style={{ fontSize: "26px" ,fontWeight: 'bold'}}>
              <div class="col">Robot Details </div>
            </div>
            <br />
            <div class="row"style={{ fontSize: "20px" ,fontWeight: 'bold'}}>
              <div class="col">Robot id: {this.state.robot.roboId} </div>
              <div class="col">Robot Name: {this.state.robot.roboName}</div>
            </div>
            <br />
            <div class="row"style={{ fontSize: "20px" ,fontWeight: 'bold'}}>
              <div class="col">Robot State: {this.state.robot.roboState}</div>
              <div class="col">Run Time: {this.state.robot.runTime}</div>
            </div>
            <br />
            <div class="row"style={{ fontSize: "20px" ,fontWeight: 'bold'}}>
              <div class="col">Robot Path x : {this.state.x}</div>
              <div class="col">Robot Path y : {this.state.y}</div>
            </div>
            <br />
          </div>
          <div class="card2" style={{ width: "80%" }}>
            <div class="row" style={{ fontSize: "20px" }}>
              <div class="col"style={{ fontSize: "26px" ,fontWeight: 'bold'}}>Move Robot </div>
            </div>
            <div class="grid-container" style={{ marginLeft: "15%",fontSize: "26px" ,fontWeight: 'bold',color:'black' }}>
              <div class="row">
                <div class="col-2-3">
                  <button class="btn2 btn2-hide">Move</button>
                </div>
                <div class="col-2-3"style={{ fontSize: "20px" ,fontWeight: 'bold',back:'black'}}>
                  <button
                    class="btn btn-success"style={{ fontSize: "20px" ,fontWeight: 'bold',color:'black'}}
                    onClick={(e) => this.moveup(e)}
                    type="submit"
                  >
                    UP
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-1-3">
                  <button
                    class="btn btn-success"style={{ fontSize: "20px" ,fontWeight: 'bold',color:'black'}}
                    onClick={(e) => this.moveLeft(e)}
                    type="submit"
                  >
                    LEFT
                  </button>
                </div>
                <div class="col-2-3">
                  <button
                    class="btn btn-success"style={{ fontSize: "20px" ,fontWeight: 'bold',color:'black'}}
                    onClick={(e) => this.changeStatus(e)}
                    type="submit"
                  >
                    PLAY/PAUSE
                  </button>
                </div>
                <div class="col-3-3">
                  <button
                    class="btn btn-success"style={{ fontSize: "20px" ,fontWeight: 'bold',color:'black'}}
                    onClick={(e) => this.moveRight(e)}
                    type="submit"
                  >
                    RIGHT
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-1-3">
                  <button class="btn2 btn2-hide"style={{ fontSize: "20px" ,fontWeight: 'bold',color:'#black'}}>Move</button>
                </div>
                <div class="col-2-3">
                  <button
                    class="btn btn-success"style={{ fontSize: "20px" ,fontWeight: 'bold', color:'black'}}
                    onClick={(e) => this.moveDown(e)}
                    type="submit"
                  >
                    DOWN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </UserSidebar>
      </div>
    );
  }
}

export default MoveARobot;
