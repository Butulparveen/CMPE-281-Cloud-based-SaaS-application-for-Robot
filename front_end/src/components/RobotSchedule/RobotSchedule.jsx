import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import { Bar, Line, Pie } from "react-chartjs-2";
import img1 from "./images/img-1.jpeg";
import img2 from "./images/img-2.jpeg";
import DateTimePicker from "react-datetime-picker";
// import { Sidebar } from "../Util";
import { Sidebar } from "../Util/Layout";

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class robotScheduling extends Component {
    constructor(props) {
        super(props);
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 13);
        this.state = {
          robotList: [
            { id: 1, name: "Robot 1" },
            { id: 2, name: "Robot 2" },
            { id: 3, name: "Robot 3" },
          ],
          masterData:[],
          buildingList: [],
          floorList: [],
          roomList: [],
          selectedBuilding: "",
          selectedFloor: "",
          selectedRoom: "",
          startDate: "",
          selectedRobot: "",
          endDate: "",
          scheduleList: [],
          maxDate : maxDate,
          minDate : new Date(),
          imageUrl : ""
        };
   
        // this.changeRobot = this.changeRobot.bind(this);
        // this.changeBuilding = this.changeBuilding.bind(this);
        // this.changeFloor = this.changeFloor.bind(this);
        // this.changeRoom = this.changeRoom.bind(this);
        // this.changeStartDate = this.changeStartDate.bind(this);
        // this.changeEndDate = this.changeEndDate.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
    
  
    
      render() {
        return (
            <div>
                <Sidebar>
                <h2 style={{ marginLeft: "30px", fontSize: "26px", marginTop: "30px",fontWeight:'bold' }}>Scheduling of Robot for Food Delivery</h2>
                    <br />
                    <br />
                    <div style={{ marginLeft: "30px", marginRight: "30px", backgroundColor: "rgb(255, 193, 7)"}}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ROBOT</th>
                                    <th scope="col">HOTEL</th>
                                    <th scope="col">FLOOR</th>
                                    <th scope="col">TABLE</th>
                                    <th scope="col">START TIME</th>
                                    <th scope="col">END TIME</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Sidebar>
            </div>
           
        );
      }
    }
    
 
export default robotScheduling;