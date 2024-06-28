import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { user, isAuthenticated } = useAuth0();

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
    freelancer: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = Cookies.get("email");
        const userDataResponse = await axios.get(`${userAPI}/${userEmail}`);
        const fetchedUserData = userDataResponse.data;
        setUserData({
          ...fetchedUserData,
          profilePic: isAuthenticated && user.picture ? user.picture : fetchedUserData.profilePic,
        });

        const projectsResponse = await axios.get(`${API}/projects/${fetchedUserData._id}`);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isAuthenticated, user, userAPI]);

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

  const handleFreelancerChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      freelancer: e.target.checked,
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
        <div className="accountpageleft">
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
          {isAuthenticated && (
              <p>Please Update your Phone,Role, Company or other details if you've Made your account with google</p>
            )}
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
          {editMode && (
            <div className="freelancer-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={userData.freelancer}
                  onChange={handleFreelancerChange}
                />
                Are you a freelancer?
              </label>
            </div>
          )}
          {userData.freelancer && (
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

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-details flex">
                <h3>{project.projectName}</h3>
                <p>{new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {!userData.freelancer && (
            <>
              <br />
              <Link to={"/postproject"}>
                <Button variant="outlined">Post a new Project</Button>
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
      <div className="changepw">
        <Link to="/resetpassword">
          <Button variant="outlined" className="changePassword">
            Change Password
          </Button>
        </Link>
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
