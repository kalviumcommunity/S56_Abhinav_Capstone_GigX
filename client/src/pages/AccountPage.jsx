import React, { useState, useEffect } from "react";
import "./Styles/AccountPage.css";
import { Button } from "@mui/material";
import Nav from "../components/Nav";
import pf1 from "../assets/Profiles/pf1.png";
import Footer from "../components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [nameEditMode, setNameEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phoneEditMode, setPhoneEditMode] = useState(false);
  const [roleEditMode, setRoleEditMode] = useState(false);
  const [companyEditMode, setCompanyEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = Cookies.get("email");
        const response = await axios.get(`https://gigx.onrender.com/users/${userEmail}`);
        const { name, email, phone, role, company } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setRole(role);
        setCompany(company);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userEmail = Cookies.get("email");
      await axios.put(`https://gigx.onrender.com/users/${userEmail}`, { name, email, phone, role, company });
      setNameEditMode(false);
      setEmailEditMode(false);
      setPhoneEditMode(false);
      setRoleEditMode(false);
      setCompanyEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userEmail = Cookies.get("email");
      await axios.delete(`https://gigx.onrender.com/users/${userEmail}`);
      Cookies.remove("email");
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="page-container flex">
        <div className="accountpageleft">
          <h1>Hi, {name}</h1>
          <h2>Account Details</h2>
          <div className="nameDiv flex input-container">
            <input type="text" placeholder="Name" value={name} readOnly={!nameEditMode} onChange={(e) => setName(e.target.value)} />
            {nameEditMode ? (
              <>
                <Button variant="contained" className="accountBtn" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" className="accountBtn" onClick={() => setNameEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          <div className="emailDiv flex input-container">
            <input type="email" placeholder="Email" value={email} readOnly={!emailEditMode} onChange={(e) => setEmail(e.target.value)} />
            {emailEditMode ? (
              <>
                <Button variant="contained" className="accountBtn" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" className="accountBtn" onClick={() => setEmailEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          <div className="phoneDiv flex input-container">
            <input type="text" placeholder="Phone" value={phone} readOnly={!phoneEditMode} onChange={(e) => setPhone(e.target.value)} />
            {phoneEditMode ? (
              <>
                <Button variant="contained" className="accountBtn" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" className="accountBtn" onClick={() => setPhoneEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          <div className="roleDiv flex input-container">
            <input type="text" placeholder="Role" value={role} readOnly={!roleEditMode} onChange={(e) => setRole(e.target.value)} />
            {roleEditMode ? (
              <>
                <Button variant="contained" className="accountBtn" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" className="accountBtn" onClick={() => setRoleEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          <div className="companyDiv flex input-container">
            <input type="text" placeholder="Company" value={company} readOnly={!companyEditMode} onChange={(e) => setCompany(e.target.value)} />
            {companyEditMode ? (
              <>
                <Button variant="contained" className="accountBtn" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outlined" className="accountBtn" onClick={() => setCompanyEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
          <h1>Active Projects</h1>
          <div>
            <h3>Project Name</h3>
            <h3>Project Name</h3>
            <h3>Project Name</h3>
          </div>
        </div>
        <div className="accountpageright">
          <img src={pf1} alt="" />
        </div>
      </div>
      <div className="deleteBox">
        <h1>Do you want to delete your account?</h1>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
