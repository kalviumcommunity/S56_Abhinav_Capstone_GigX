import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./Styles/ProfileDisplay.css";
import pf1 from "../assets/Profiles/pf1.png";

const ProfileDisplay = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get(`https://gigx.onrender.com/users/${email}`);

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  const handleContactClick = () => {
    window.location.href = `mailto:${user.email}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
        <Nav />
        <div className="main-container-profile">
            <div className="profile-container">
                <h1>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>
                <h3>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h3>
                <img src={pf1} alt="" />
                <p>⭐⭐⭐⭐⭐</p>
            </div>
            <div className="profile-content flex">
                <div className="content-left">
                    <div className="profile-projects">
                        <h3>Projects</h3>
                        <div className="projects flex">
                            {[1, 2, 3].map((project) => (
                                <p key={project}>Project {project}</p>
                            ))}
                        </div>
                    </div>
                    <div className="profile-worked">
                        <h3>Worked with</h3>
                        <div className="worked flex">
                            {["Person 1", "Person 2", "Person 3"].map((person) => (
                                <p key={person}>{person}</p>
                            ))}
                        </div>
                    </div>
                    {user.freelancer && (
                        <div className="profile-details">
                            <h3>Details</h3>
                            <p> <strong> Location:</strong> {user.location}, {user.country}</p>
                            <p> <strong> Skills:</strong> {user.skills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)).join(", ")}</p>
                            <p> <strong>Experience:</strong>  {user.experience}</p>
                        </div>
                    )}
                </div>
                <div className="content-right">
                    <button className="contact-button" onClick={handleContactClick}>
                        Contact Now
                    </button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
};

export default ProfileDisplay;
