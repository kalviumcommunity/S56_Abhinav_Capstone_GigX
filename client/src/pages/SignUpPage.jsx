import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";
import './Styles/SignUp.css';
import Cookies from 'js-cookie';
const SignUpPage = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    password: '',
    freelancer: false 
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {

      const  response= await axios.post('https://gigx.onrender.com/signup', formData);
      const { token,email } = response.data;

      Cookies.set('token', token); 
            Cookies.set('email', email);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email already exists');
      } else {
        console.error('Unexpected error:', error);
      }
    }
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
                <input type="text" name="name" placeholder="Name" className='signup-input' onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className='signup-input' onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" className='signup-input' onChange={handleChange} required />
                <input type="text" name="role" placeholder="Role" className='signup-input' onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" className='signup-input' onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" className='signup-input' onChange={handleChange} required />
                <div className="center">
                  <input type="checkbox" name="freelancer" className='pointer' onChange={handleChange} />
                  <label >I am a Freelancer</label>
                </div>
              </div>
              <button type="submit" className='signupbtn'>Sign Up</button>
              {errorMessage && <p style={{ color: 'red', textAlign:"center" }}>{errorMessage}</p>}

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
