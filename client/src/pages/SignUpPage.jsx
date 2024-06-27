import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import google from "../assets/google.png";
import loginimg from "../assets/loginimg.png";
import './Styles/SignUp.css';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUpPage = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
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

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone_number || "1234567890",
        role: user.given_name,
        company: user.address,
        password: '123',
        freelancer: false,
        

      };
      axios.post(`${API}/signup`, userData).then(response => {
        const { token, email } = response.data;
        Cookies.set('token', token);
        Cookies.set('email', email);
        toast.success('Signup successful!', {
          autoClose: 1000,
          onClose: () => navigate('/')
        });
      }).catch(error => {
        console.error('Error saving user data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        toast.error('An error occurred. Please try again later.');
      });
    }
  }, [isAuthenticated, user, navigate]);
  console.log(user)
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
      const response = await axios.post(`${API}/signup`, formData);
      const { token, email } = response.data;
      Cookies.set('token', token); 
      Cookies.set('email', email);
      toast.success('Sign up successful!', {
        autoClose: 1000,
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        switch (error.response.status) {
          case 400:
            toast.error('Email already exists');
            break;
          case 422:
            toast.error('Invalid input. Please check your data.');
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            break;
          default:
            toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
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
                  <label>I am a Freelancer</label>
                </div>
              </div>
              <button type="submit" className='signupbtn'>Sign Up</button>
              <p className='center'>Or</p>
              {isAuthenticated ? (
                <div className="google pointer" onClick={() => logout({ returnTo: window.location.origin })}>
                  <img src={google} alt="Google icon" />
                  <p>Logout</p>
                </div>
              ) : (
                <div className="google pointer" onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}>
                  <img src={google} alt="Google icon" />
                  <p>Continue With Google</p>
                </div>
              )}
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
