import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./Styles/ProfileDisplay.css";
import pf1 from "../assets/Profiles/pf1.png";
import { IoStar,IoStarOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const ProfileDisplay = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0); 
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${email}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ratings/${email}`);
        if (response.data) {
          setUserRating(response.data.rating);
          setAvgRating(response.data.avgRating);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRating();
  }, [email]);

  const handleContactClick = () => {
    window.location.href = `mailto:${user.email}`;
  };

  const handleUserRatingClick = async (star) => {
    if (user.email === Cookies.get("email")) {
      console.log("You cannot rate yourself.");
      return;
    }
  
    setUserRating(star);
    try {
      await axios.put("http://localhost:3000/ratings", {
        email: user.email,
        ratedBy: Cookies.get("email"), 
        rating: star,
      });
      console.log("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
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
          <img src={user.profilePic || pf1} alt="" />
          <div className="avg-rating">
  {[...Array(5)].map((_, index) => (
    <span key={index}>
      {index < avgRating ? <IoStar style={{ color: "gold" }} /> : <IoStarOutline style={{ color: "gray" }} />}
    </span>
  ))}
</div>

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
                <p>
                  <strong> Location:</strong> {user.location}, {user.country}
                </p>
                <p>
                  <strong> Skills:</strong>{" "}
                  {user.skills.map((skill) => skill.charAt(0).toUpperCase() + skill.slice(1)).join(", ")}
                </p>
                <p>
                  <strong>Experience:</strong> {user.experience}
                </p>
              </div>
            )}
          </div>
          <div className="content-right">
            <button className="contact-button" onClick={handleContactClick}>
              Contact Now
            </button>
            <div className="rating-section">
              <h3>Rate {user.name}</h3>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleUserRatingClick(star)}
                  style={{ cursor: "pointer", color: star <= userRating ? "gold" : "gray" }}
                >
                  {star <= userRating ? <IoStar /> : <IoStarOutline />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileDisplay;
