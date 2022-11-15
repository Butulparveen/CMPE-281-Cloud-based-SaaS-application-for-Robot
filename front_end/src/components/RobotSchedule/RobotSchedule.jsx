import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import { Bar, Line, Pie } from "react-chartjs-2";
import img1 from "./images/img-1.jpeg";
import img2 from "./images/img-2.jpeg";
// import DateTimePicker from "react-datetime-picker";
// import { Sidebar } from "../Util";
import { Sidebar } from "../Util/Layout";
import { history } from '../Util/history';
import { Link } from 'react-router-dom';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class robotScheduling extends Component {
    constructor(props) {
        super(props);
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 13);
        this.state = {
          robotId: '',
          hotelId: '',
          floorId: '',
          tableId: '',
          startDateTime: '',
          endDateTime: '',
          scheduleList: [],
          maxDate : maxDate,
          minDate : new Date(),
          imageUrl : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      handleChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        });
    };

      handleSubmit(e) {
        e.preventDefault();
        if (this.state.robotId) {
            const schedule = {
                robotId: this.state.robotId,
                hotelId: this.state.hotelId,
                floorId: this.state.floorId,
                tableId: this.state.tableId,
                startDateTime: new Date(),
                endDateTime: new Date()
            };
            axios
                .post(backend + "/api/users/createSchedule", schedule, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    history.push('/schedule');
                    alert(`Robot Scheduled Successfully`)
                });
        }
    }


      componentDidMount() {
        axios
            .get(backend + "/api/users/schedule", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.data) {
                    this.setState({ scheduleList: response.data.payload })
                }
            });
    }
  
      render() {
        return (
            <Sidebar>
            <div style={{ width: "50%", marginTop: "2%", marginLeft: "20%", marginRight: "20%" }}>
                    <h3 style={{ marginLeft: "40%", fontSize: "26px", fontWeight:"bold"}}>Schedule Robot</h3>
                    <br />
                    <form name="form" onSubmit={e => this.handleSubmit(e)}>
                    {/* <form name="form"style={{fontSize: "18px", fontWeight:"bold" }}> */}
                        <div className="form-group">
                            <label>Robot Id</label>
                            <input type="text" name="robotId" onChange={e => this.handleChange(e, "robotId")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>Hotel</label>
                            <input type="text" name="hotelId" onChange={e => this.handleChange(e, "hotelId")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>Floor</label>
                            <input type="text" name="floorId" onChange={e => this.handleChange(e, "floorId")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>Table</label>
                            <input type="text" name="tableId" onChange={e => this.handleChange(e, "tableId")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>Start date</label>
                            <input type="text" name="startDate" onChange={e => this.handleChange(e, "startDate")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>Start time</label>
                            <input type="text" name="startTime" onChange={e => this.handleChange(e, "startTime")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>End date</label>
                            <input type="text" name="endDate"onChange={e => this.handleChange(e, "endDate")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                            <label>End time</label>
                            <input type="text" name="endTime"onChange={e => this.handleChange(e, "endTime")} className={'form-control'} />
                        </div>
                        <div className="form-group">
                        <button className="btn btn-primary">
                                Confirm
                </button>
                            <Link to="/userDashboard" className="btn btn-link"style={{fontSize: "18px", fontWeight:"bold" }}>Dashboard</Link>
                        </div>
                    </form>
                </div>




            <div>
              
                <h2 style={{ marginLeft: "30px", fontSize: "26px", marginTop: "30px",fontWeight:'bold' }}>Scheduling of Robot for Food Delivery</h2>
                    <br />
                    <br />
                    <div style={{ marginLeft: "30px", marginRight: "30px", backgroundColor: "#fbd38d"}}>
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
                 
                 {Array.isArray(this.state.scheduleList) && this.state.scheduleList.map((data, i) => {
                     return (
                         <tr key={i}>
                             <td>{data.robot_id}</td>
                             <td>{data.hotel_id}</td>
                             <td>{data.floor_id}</td>
                             <td>{data.table_id}</td>
                             <td>{data.start_date_time}</td>
                             <td>{data.end_date_time}</td>
                             <td>{data.status.toLowerCase()}</td>
                             <td style={{color:'green'}}>{data.statusName}</td>
                         </tr>
                     )
                 })}
             </tbody>

                        </table>
                    </div>
                
            </div>
            </Sidebar>
           
        );
      }
    }
    
 
export default robotScheduling;