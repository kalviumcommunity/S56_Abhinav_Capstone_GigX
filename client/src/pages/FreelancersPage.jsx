import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const FreelancersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://gigx.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Nav />
      <div className="companyPage">
        {users.map(user => (
          user.freelancer && (
            <Link to={`/profile/${user.email}`} key={user._id}>
              <div key={user._id} className="card">
                <h2 className="cardHeading">{user.name}</h2>
                <div className="pic">
                  <img src="https://imgs.search.brave.com/otk_6KZbTk6hvwBXghj7t7PF4hklKOQkYgWpx3oIfAo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTE5NS8xMTE5/NTEwOC5wbmc" height={"50px"} alt="" />
                </div>
                <div className="cardContent">
                  <p className="cardText">{user.company}</p>
                  <p className="cardText">{user.email}</p>
                  <p className="cardText">{user.phone}</p>
                  <p className="cardText"><strong>{user.role}</strong></p>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default FreelancersPage;
