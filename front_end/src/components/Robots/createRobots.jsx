import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import { history } from '../Util/history';
import { Link } from 'react-router-dom';

class CreateRobots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robotName: '',
            robotId: ''
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
        if (this.state.robotName && this.state.robotId) {
            let robotPath = [];
            const robotPathObj = { x: 0, y: 0 }
            robotPath.push(robotPathObj)
            const robot = {
                userId: localStorage.getItem('user_Id'),
                roboName: this.state.robotName,
                robotPath: robotPath,
                robotId: this.state.robotId,
                startSessionTime: Date().toLocaleString(),
                endSessionTime: Date().toLocaleString()
            };
            axios
                .post(backend + "/api/robots/createRobot", robot, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    history.push('/userDashboard');
                    alert(`Created Robot Successfully`)
                });
        }
    }
    render() {
        return (
            <UserSidebar>
                <div style={{ width: "50%", marginTop: "10%", marginLeft: "20%", marginRight: "20%" }}>
                    <h3 style={{ marginLeft: "40%" }}>Create Robot</h3>
                    <br />
                    <br />
                    <form name="form" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label>Robot Name</label>
                            <input type="text" name="robotName" onChange={e => this.handleChange(e, "robotName")} className={'form-control'} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Robot Id</label>
                            <input type="password" name="robotId" onChange={e => this.handleChange(e, "robotId")} className={'form-control'} />
                        </div>
                        <br />
                        <div className="form-group">
                            <button className="btn btn-primary">
                                Create Robot
                </button>
                            <Link to="/userDashboard" className="btn btn-link">Dashboard</Link>
                        </div>
                    </form>
                </div>
            </UserSidebar>
        );
    }
}

export default CreateRobots;
