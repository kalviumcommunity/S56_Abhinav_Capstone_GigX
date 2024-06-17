import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import google from "../assets/google.png";
import loginimg from "../assets/loginimg.png";
import './Styles/LoginPage.css';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

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
                    Don&apos;t have an account? <Link to={"/signup"}> <span className='pointer signup'>Sign Up</span></Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
