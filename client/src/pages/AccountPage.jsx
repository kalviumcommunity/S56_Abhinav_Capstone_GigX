import  { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Styles/AccountPage.css";
import Nav from "../components/Nav";
import pf1 from "../assets/Profiles/pf1.png";
import Footer from "../components/Footer";
import AccountInput from "../components/AccountInput";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountPage = () => {
  const userAPI = `${API}/users`;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    company: "",
    skills: [],
    location: "",
    country: "",
    experience: "",
    profilePic: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [freelancer, setFreelancer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = Cookies.get("email");
        const response = await axios.get(`${userAPI}/${userEmail}`);
        const fetchedData = response.data;
        setUserData(fetchedData);
        setFreelancer(fetchedData.freelancer);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userEmail = Cookies.get("email");
      await axios.put(`${userAPI}/${userEmail}`, userData);
      setEditMode(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userEmail = Cookies.get("email");
      await axios.delete(`${userAPI}/${userEmail}`);
      Cookies.remove("email");
      Cookies.remove("token");
      navigate("/");
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting user account:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (fieldName, newValue) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: newValue,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(`${API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.data.secure_url;
      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePic: imageUrl,
      }));
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="page-container flex">
        <div className="accountpageleft ">
          <h1>Hi, {userData.name}</h1>
          <div className="account-details flex">
            <h2>Account Details</h2>
            <Button
              variant="outlined"
              className="accountBtn"
              onClick={handleEditMode}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            {editMode && (
              <Button
                variant="contained"
                className="accountBtn"
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </div>
          <AccountInput
            fieldName="name"
            value={userData.name}
            editMode={editMode}
            placeholder="Name"
            onChange={(newValue) => handleChange("name", newValue)}
          />
          <AccountInput
            fieldName="email"
            value={userData.email}
            editMode={editMode}
            placeholder="Email"
            onChange={(newValue) => handleChange("email", newValue)}
          />
          <AccountInput
            fieldName="phone"
            value={userData.phone}
            editMode={editMode}
            placeholder="Phone"
            onChange={(newValue) => handleChange("phone", newValue)}
          />
          <AccountInput
            fieldName="role"
            value={userData.role}
            editMode={editMode}
            placeholder="Role"
            onChange={(newValue) => handleChange("role", newValue)}
          />
          <AccountInput
            fieldName="company"
            value={userData.company}
            editMode={editMode}
            placeholder="Company"
            onChange={(newValue) => handleChange("company", newValue)}
          />
          {freelancer && (
            <>
              <AccountInput
                fieldName="skills"
                value={userData.skills.join(",")}
                editMode={editMode}
                placeholder="Skills"
                onChange={(newValue) =>
                  handleChange("skills", newValue.split(","))
                }
              />
              <AccountInput
                fieldName="location"
                value={userData.location}
                editMode={editMode}
                placeholder="Location"
                onChange={(newValue) => handleChange("location", newValue)}
              />
              <AccountInput
                fieldName="country"
                value={userData.country}
                editMode={editMode}
                placeholder="Country"
                onChange={(newValue) => handleChange("country", newValue)}
              />
              <AccountInput
                fieldName="experience"
                value={userData.experience}
                editMode={editMode}
                placeholder="Experience"
                onChange={(newValue) => handleChange("experience", newValue)}
              />
            </>
          )}

          <h1>Active Projects</h1>
          <div>
            <h3>Project Name</h3>
            <h3>Project Name</h3>
            <h3>Project Name</h3>
          </div>
          {!freelancer && (
            <>
              <br />
              <Link to={"/postproject"}>
                <Button variant="outlined"> Post a new Project</Button>
              </Link>
            </>
          )}
        </div>
        <div className="accountpageright flex">
          <img src={userData.profilePic || pf1} alt="profilePic" />
          {editMode && (
            <>
              <p>Upload Profile Picture</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginBottom: "10px" }}
              />
            </>
          )}
        </div>
      </div>
      <div className="deleteBox">
        <h1>Do you want to delete your account?</h1>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
