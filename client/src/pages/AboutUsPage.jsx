import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import aboutusworker from "../assets/aboutusworker.jpg";
import "./Styles/AboutUsPage.css";
import { Link } from "react-router-dom";
const AboutUsPage = () => {
  return (
    <>
      <Nav />
      <div className="aboutus-main-container flex">
        <div className="about-left">
          <h1>The Freelancing Platform for the Modern Workforce</h1>
          <p>
          Connecting talented freelancers with businesses. Our mission is to make work accessible, flexible, and rewarding for everyone.
          </p>
        </div>
        <div className="about-right">
          <img
            src={aboutusworker}
            alt="worker" height={400}
          />
        </div>
      </div>
      <div className="features">
        <h1>The Future of Work</h1>
        <p>Embracing the gig economy. Our
           platform provides the tools and support for seamless collaboration between businesses and freelancers.</p>
      </div>

      <div className="features-block">
    <div className="feature-1">
        <h2>Work Anywhere</h2>
        <p>Freelancers can work from anywhere in the world, on their own schedule.</p>
    </div>
    <div className="feature-2">
        <h2>Find Talent</h2>
        <p>Businesses can find the right talent for their projects.</p>

      </div>
        <div className="feature-3">
            <h2>Flexible Payments</h2>
            <p>Freelancers can set their own rates and get paid quickly.</p>
        </div>
        </div>
        <div className="community">
            <h1>Join the community</h1>
            <p>Embracing the gig economy. Our platform provides the tools and support for seamless collaboration between businesses and freelancers.</p>
        </div>
        <div className="recruiters">
            <img src="https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg" alt="google" />
            <img src="https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg" alt="amazon" />
            <img src="https://kalvium.com/wp-content/uploads/2023/04/Kalvium-Logo-SVG.svg" alt="kalvium" />
        <img src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg" alt="netflix" />
        <img src="https://www.logo.wine/a/logo/Meta_Platforms/Meta_Platforms-Logo.wine.svg" alt="meta" />
        <img src="https://www.logo.wine/a/logo/Apple_Inc./Apple_Inc.-Logo.wine.svg" alt="apple" />
        <img src="https://www.logo.wine/a/logo/Microsoft/Microsoft-Logo.wine.svg" alt="microsoft" />
        </div>
        <div className="btns-about">
           <Link to={"/signup"}> <button className="btn">Join Now</button></Link>
          <Link to={"/"}> <button className="btn">Learn More</button></Link>
        </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
