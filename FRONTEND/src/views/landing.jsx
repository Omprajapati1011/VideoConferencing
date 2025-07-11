import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landingPageContainer ">
      <nav className="Navbar">
        <div className="navHeader">
          <h2>ZOOM video Call</h2>
        </div>

        <div className="navList">
          <ul className="navList-ul">
            <li>Join as Guest</li>
            <li>Register</li>
            <div className="LoginButton">
              <li>Login</li>
            </div>
          </ul>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="leftMain">
          <h1>
            {" "}
            <span style={{ color: "orange" }}> Connect</span> With Your Loves
            Ones
          </h1>
          <p>Cover a distance by Zoom Call</p>

          <Link to="/auth" className="GetStartedButton">Get Started</Link>


        </div>

        <div className="rightMain">
          <img src="/mobile.png" alt="pic" srcSet="" />
        </div>
      </div>
    </div>
  );
}
