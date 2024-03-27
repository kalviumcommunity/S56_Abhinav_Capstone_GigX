import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Styles/LoginPage.css";
import google from "../assets/google.png";
import loginimg from "../assets/loginimg.png";
import { FaTimes } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();
  const handleSignInSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <div className="container">
        <Link to="/" className="close-icon">
          <FaTimes />
        </Link>
        
        <form onSubmit={handleSignInSubmit}>
          <div className="flex-container flex">
            <div className="box-left">
              <h1>Welcome Back!</h1>
              <p>Sign in to your account to continue</p>
              <div className="input">
                <input type="email" placeholder="Email" className='logininput'required />
                <input type="password" placeholder="Password" className='logininput' required />
              </div>
              <button type="submit" className='signinbtn'>Sign In</button>
              <p className='forgot pointer'>Forgot Password?</p>

              <p className='center'>Or</p>
              <div className="google pointer">
                <img src={google} alt="" />
                <p>Continue With Google</p>
              </div>
            </div>
            <div className="box-right">
              <img src={loginimg} alt=" Login image" />
            </div>
          </div>
        </form>

        <p className='center'>
          Don't have an account? <Link to={"/signup"}> <span className='pointer signup'>Sign Up</span></Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
