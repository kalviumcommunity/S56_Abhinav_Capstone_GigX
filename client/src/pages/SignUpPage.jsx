import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Styles/SignUp.css"; 
import { FaTimes } from 'react-icons/fa';
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";

const SignUpPage = () => {
  const navigate = useNavigate(); 

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/'); 
  };

  return (
    <div>
      <div className="signup-container">
        <Link to="/" className="close-icon">
          <FaTimes />
        </Link>
        
        <form onSubmit={handleSignUp}>
          <div className="container-main flex">
            <div className="left-section">
              <h1>Create an Account</h1>
              <div className="input">
                <input type="text" placeholder="Name" className='signup-input' required />
                <input type="email" placeholder="Email" className='signup-input' required />
                <input type="tel" placeholder="Phone Number" className='signup-input' required />
                <input type="text" placeholder="Role" className='signup-input' required />
                <input type="text" placeholder="Company" className='signup-input' />
                <input type="password" placeholder="Password" className='signup-input' required />
                <div className="center">
                  <input type="checkbox" name="user" id="" className='pointer' />
                  <label >I am a Freelancer</label>
                </div>
              </div>
              <button type="submit" className='signupbtn'>Sign Up</button>
              <p className='center'>Or</p>
              <div className="google pointer">
                <img src={google} alt="" />
                <p>Continue With Google</p>
              </div>
              
            </div>
            <div className="right-section">
              <img src={loginimg} alt="sign up image" />
            </div>
          </div>
        </form>

        <p className='center'>
          Already have an account? <Link to={"/login"}><span className='pointer loginbtn'>Login</span></Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
