import React, { useState, useEffect } from "react";
import "./Styles/Nav.css";
import logo from "../assets/logo.png";
import { IoIosCall } from "react-icons/io";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("token");
    setIsLoggedIn(!!userCookie); 
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); 
    Cookies.remove("email");
    setIsLoggedIn(false); 
    navigate("/");
  };

  return (
    <div>
      <nav className="topnav flex">
        <div className="routes flex">
          <Link to={"/"}> <p>Home</p></Link>
          <Link to={"/companies"} > <p>Companies</p></Link>
          <Link to={"/freelancers"}> <p>Freelancers</p></Link>
          <Link to={"/aboutus"}><p>About Us</p></Link>
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
          <Link to={"/"}>
          <img src={logo} alt="logo" /></Link>
          <select defaultValue=""  >
            <option value="selected" disabled >Select Location</option>
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
          <TextField
            id="standard-basic"
            label="Search Here"
            variant="standard"
            className="search"
          />
          <FaSearch className="searchicon" />
        </div>
        <div className="right flex">
          {isLoggedIn ? (
            <Button variant="outlined" onClick={handleLogout}>
              Sign Out
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button variant="outlined">Sign In</Button>
            </Link>
          )}
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <Button variant="contained">My Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
