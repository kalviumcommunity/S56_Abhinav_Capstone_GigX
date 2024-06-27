import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import google from "../assets/google.png";
import loginimg from "../assets/loginimg.png";
import './Styles/LoginPage.css';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Check if user is authenticated and save token and email in cookies
        if (isAuthenticated && user) {
            Cookies.set('token', 'your_token_value'); // Replace 'your_token_value' with actual token
            Cookies.set('email', user.email);
        } else {
            // Clear cookies if user is not authenticated
            Cookies.remove('token');
            Cookies.remove('email');
        }
    }, [isAuthenticated, user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API}/login`, formData);
            const { token, email } = response.data;
            Cookies.set('token', token);
            Cookies.set('email', email);
            toast.success('Login successful!', {
                autoClose: 1000,
                onClose: () => navigate('/')
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password');
                toast.error('Invalid email or password');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <ToastContainer />
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
                                <input type="email" name="email" value={formData.email} placeholder="Email" className='logininput' onChange={handleChange} required />
                                <input type="password" name="password" value={formData.password} placeholder="Password" className='logininput' onChange={handleChange} required />
                            </div>
                            <button type="submit" className='signinbtn'>Sign In</button>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <Link to={"/resetpassword"}> <p className='forgot pointer'>Forgot Password?</p></Link>
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
                        <div className="box-right">
                            <img src={loginimg} alt=" Login image" />
                        </div>
                    </div>
                </form>
                <p className='center'>
                    Don&apos;t have an account? <Link to={"/signup"}> <span className='pointer signup'>Sign Up</span></Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
