import React from 'react';
import "./Styles/Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
return (
    <div className="footer-container">
        <div className="footer">
            <div className="footer-left">
                <img src={logo} alt="Company Logo" />
                <p>GigX connects businesses with top-rated freelancers, using AI to streamline projects and empower freelance success.</p>
            </div>
            <div className="footer-center">
                <h3>Company</h3>
                <ul>
                    <li>About</li>
                    <li>Team</li>
                    <li>Careers</li>
                    <li>Contact</li>
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
        <p className='copyright'>&copy; 2024 GigX. All rights reserved.</p>
    </div>
);
};

export default Footer;
