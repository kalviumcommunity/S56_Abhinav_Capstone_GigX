import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Styles/CompanyPage.css";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const CompanyPage = () => {
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
        !user.freelancer && (
          <div key={user._id} className="card">
            <h2 className="cardHeading">{user.company}</h2>
            <div className="pic">
                <img src="https://imgs.search.brave.com/vrXC1JZSY5YteJpy0nlEsfSI4tj8OOWNJY6_N0ongRE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kM3N4/c2htbmNzMTB0ZS5j/bG91ZGZyb250Lm5l/dC9pY29uL3ByZW1p/dW0vcG5nLTI1Ni8z/MDAxMjU2LnBuZz90/b2tlbj1leUpoYkdj/aU9pSm9jekkxTmlJ/c0ltdHBaQ0k2SW1S/bFptRjFiSFFpZlFf/Xy5leUpwYzNNaU9p/SmtNM040YzJodGJt/TnpNVEIwWlM1amJH/OTFaR1p5YjI1MExt/NWxkQ0lzSW1WNGND/STZNVGN4TWpNeE1q/QTRNaXdpY1NJNmJu/VnNiQ3dpYVdGMElq/b3hOekV5TURVeU9E/Z3lmUV9fLjRkYTcy/MGMzNGFmOWY2MDQ2/MTk4MWEzZTc4Y2Nh/M2I3OWQ1ZDY2NWNm/NTQxYzNiN2I0YjBi/ZGRmNTU4MjIzNzY" height={"50px"} alt="" />
            </div>
            <div className="cardContent">
              <p className="cardText"> {user.name}</p>
              <p className="cardText">{user.email}</p>
              <p className="cardText">{user.phone}</p>
              <p className="cardText"><strong> {user.role} </strong></p>
            </div>
          </div>
        )
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default CompanyPage;
