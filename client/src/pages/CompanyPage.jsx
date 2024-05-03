import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Styles/CompanyPage.css";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import pf1 from '../assets/Profiles/pf1.png';

const CompanyPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/users`);
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
        !user.freelancer && (
            <Link to={`/profile/${user.email}`} key={user._id} >
          <div key={user._id} className="card">
            <h2 className="cardHeading">{user.company}</h2>
            <div className="pic">
                <img src={user.profilePic || pf1} height={"50px"} alt="" />
            </div>
            <div className="cardContent">
              <p className="cardText"> {user.name}</p>
              <p className="cardText">{user.email}</p>
              <p className="cardText">{user.phone}</p>
              <p className="cardText"><strong> {user.role} </strong></p>
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


export default CompanyPage;
