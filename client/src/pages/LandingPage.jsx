import React from 'react'
import "./Styles/LandingPage.css"
import heroimg from "../assets/heroimg.png"
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Button from '@mui/material/Button';
import ProfileInfo from '../components/ProfileInfo';
import pf1 from "../assets/Profiles/pf1.png"
import pf2 from "../assets/Profiles/pf2.png"
import pf3 from "../assets/Profiles/pf3.png"
import pf4 from "../assets/Profiles/pf4.png"
import working from "../assets/working.png"
import Footer from '../components/Footer';
import Nav from '../components/Nav';



const LandingPage = () => {
  return (
    <div>
<Nav />
        <div className="hero flex">
            <div className="hero-left">
                <h1>The Future of Freelance Work is Here.</h1>
                <p>GigX connects businesses with talented freelancers for seamless project completion.</p>

                <div className="search-bar flex">
                    <div className="location flex">
                    <FaLocationDot />
 <input type="text" placeholder="Location" />
                    </div>
                    <div className="keyword flex">
                    <FaSearch />
 <input type="text" placeholder="Keyword" />
                        </div>
                        <Button className='find' variant="contained">Find Freelancer</Button>
                        
                    
                    </div>
                    <p className='msg'>Still confused of What to do? <span> Call us now!</span></p>

            </div>
            <div className="hero-right">
                <img src={heroimg} alt="" />

            </div>
        
        </div>
        <div className="topFreelancers flex">
        <ProfileInfo
          profilePic={pf1}
          name="Abhinav"
          rating="4.5"
        />
        <ProfileInfo
          profilePic={pf4}
          name="Anubhav"
          rating="4.8"
        />
        <ProfileInfo
          profilePic={pf3}
          name="Anibhav"
          rating="4.2"
        />
        <ProfileInfo
          profilePic={pf2}
          name="Avinab"
          rating="4.0"
        />
        </div>
        <div className="company">
            <h1>
                Our Top Recruiters
            </h1>
                <div className="companies flex">
                    <img src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg" alt="netflix" />
                    <img src="https://www.logo.wine/a/logo/Microsoft/Microsoft-Logo.wine.svg" alt="microsoft" />
                    <img src="https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg" alt="amazon" />
                </div>
        </div>

        <div className="working">
            <h1>
                How GigX Works?
            </h1>
            <div className="workingimg flex">

            <img src={working} alt="" />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default LandingPage