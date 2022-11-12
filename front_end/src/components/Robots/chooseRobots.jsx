import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { UserSidebar } from "../Util/UserLayout";
import roboImage from "../Util/roboImage.jpeg";
import { history } from '../Util/history';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ChooseRobots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: []
        };
    }
    createRobot = e => {
        history.push("/createRobot")
    }
    chooseRobotPATH = (e, id) => {
        history.push("/plotRobotPath", id)
    }
    chooseRobot = (e, id) => {
        localStorage.setItem("roboId", id);
        window.open("./robot_controller.html")
        //history.push("/navigation", id)
    }
    componentDidMount() {
        console.log("UI", localStorage.getItem('user_Id'))
        axios
            .get(backend + "/api/robots/allRegRobots", {
                params:

                {
                    user_id: localStorage.getItem("user_Id")
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
        let robots = this.state.robots.map(
            robot => {
                return (
                    <div class="col-sm-4 o">
                        <Card style={{ maxWidth: "345px" }}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: "180px" }}
                                    image={roboImage}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {robot.roboName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Robot id: {robot.roboId}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Robot State: {robot.roboState}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Run Time: {robot.runTime}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Robot Bill: {((robot.runTime * (1 / 60)) ).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="medium" color="primary" onClick={e => this.chooseRobot(e, robot._id)}>
                                    Play
        </Button>
                                <Button size="medium" color="primary" onClick={e => this.chooseRobotPATH(e, robot._id)}>
                                    Path
        </Button>
                            </CardActions>
                        </Card>


                    </div>
                );
            }
        );
        return (
            <div>
                <UserSidebar>
                    <div style={{ float: "right" }}><button
                        class="btn btn-success"
                        onClick={this.createRobot}
                        type="submit"
                    >
                        Create Robot
              </button>{' '}</div>
                    <br />
                    <h2 style={{ marginLeft: "10%", fontSize: "20px" }}> Existing Robots</h2>
                    <br />
                    <br />
                    <div className="row" style={{ marginLeft: "5%", }}>
                        {robots}
                    </div>
                </UserSidebar>
            </div >
        );
    }
}

export default ChooseRobots;
