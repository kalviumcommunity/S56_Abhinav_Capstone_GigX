import React from "react";
import "./Styles/Nav.css";
import logo from "../assets/logo.png";
import { IoIosCall } from "react-icons/io";
import { TextField } from "@mui/material";
import {Button} from "@mui/material";
import { FaSearch  } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="topnav flex">
        <div className="routes flex">
          <p>Home</p>
          <p>Companies</p>
          <p>Freelancers</p>
          <p>About Us</p>
        </div>

        <div className="rightnav flex">
          <div className="call flex">
            <IoIosCall /> <span>+91 60027 59990</span>
          </div>
          <div className="lang">
            <p>English</p>
          </div>
        </div>
      </nav>
      <div className="bottomnav flex">
        <div className="left flex">
          <img src={logo} alt="logo" />
          <select>
            <option value="" disabled selected>Select Location</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Surat">Surat</option>
          </select>
        </div>
        <div className="center flex">
        <TextField id="standard-basic" label="Search Here" variant="standard" className="search" />
        <FaSearch className="searchicon" />
        </div>
        <div className="right flex">
          <Link to={"/login"}>
        <Button variant="outlined">Sign In</Button></Link>
        <Button variant="contained">Post Project</Button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
