import React, { Component } from "react";

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";

export const NavbarDefault = () => {
    let userDetails;
    let url = window.location.href;
    if (localStorage.getItem('user_fn') && !url.includes("/login")) {
        userDetails = <div style={{ color: "white", marginLeft: "30%", fontWeight: "bold" }}>{localStorage.getItem('user_fn')}{" "}{localStorage.getItem('user_ln')}{" : "}{localStorage.getItem('user_role')}</div>;
    }
    return (
        <div style={{ backgroundColor: "#daa626" }}>
            <nav class="navbar navbar-expand-lg navbar-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="#" style={{ color: "black", fontSize:"26px",fontWeight: "bold", marginLeft: "45%" }}>Robot Cloud for Food Delivery</a>
                    {userDetails}
                </div>
            </nav>

        </div>
    );

}
