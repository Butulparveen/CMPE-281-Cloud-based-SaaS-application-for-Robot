import { backend } from "../webConfig";
import axios from "axios";

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    console.log("Frontend Service", username, password);
    const user = {};
    user.username = username;
    user.password = password;
    console.log("Frontend Service", user);
    return axios
        .post(backend + "/api/account/login", user, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response;
        });
}

function logout() {
    localStorage.removeItem('user_fn');
    localStorage.removeItem('user_ln');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_Id');
    localStorage.removeItem('roboId');
}

function register(user) {
    return axios
        .post(backend + "/api/account/register", user, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log("cricbuzz", response);
            return response;
        });
}