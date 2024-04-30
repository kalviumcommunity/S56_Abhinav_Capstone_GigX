import { useState } from 'react';
import './Styles/ContactUs.css'; 
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import axios from 'axios'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:3000/contact', formData);
      console.log('Form data submitted successfully');
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <>
    <Nav />
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <p className='para'>
        If you have any questions or need help, please fill out the form below
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <div className="contact-submit">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
