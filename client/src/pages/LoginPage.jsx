import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import google from "../assets/google.png";
import loginimg from "../assets/loginimg.png";
import './Styles/LoginPage.css';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
            const response = await axios.post('https://gigx.onrender.com/login', formData);
            const { token } = response.data;
            Cookies.set('token', token); 
            navigate('/');

        } catch (error) {
            console.error('Error signing in:', error);
        }
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
                                <input type="email" name="email" value={formData.email} placeholder="Email" className='logininput' onChange={handleChange} required />
                                <input type="password" name="password" value={formData.password} placeholder="Password" className='logininput' onChange={handleChange} required />
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
                    Don&apos;t have an account? <Link to={"/signup"}> <span className='pointer signup'>Sign Up</span></Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
