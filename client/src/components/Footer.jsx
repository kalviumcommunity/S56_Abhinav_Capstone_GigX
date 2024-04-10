import React from 'react';
import "./Styles/Footer.css";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

return (
    <div className="footer-container">
        <div className="footer">
            <div className="footer-left">
               <Link to={"/"}> <img src={logo} alt="Company Logo" /></Link>
                <p>GigX connects businesses with top-rated freelancers, using AI to streamline projects and empower freelance success.</p>
            </div>
            <div className="footer-center">
                <h3>Company</h3>
                <ul>
                    <Link to={"/aboutus"}><li>About</li></Link>
                    <li>Team</li>
                    <li>Careers</li>
                    <Link to={"/contactus"}><li>Contact</li></Link>
                </ul>
            </div>
            <div className="footer-right">
                <h3>Connect</h3>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
        </div>
            <p className='copyright'> <strong> contactgigx@gmail.com</strong> </p>
        <p className='copyright'>&copy; {currentYear} GigX. All rights reserved.</p>
    </div>
);
};

export default Footer;
