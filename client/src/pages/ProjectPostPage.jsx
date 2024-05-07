import React, { useState } from 'react';
import "./Styles/ProjectPost.css";
import Nav from '../components/Nav';

const ProjectPostPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    skillsRequired: '',
    referenceDocument: '',
    budget: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace this with your database operation
    setFormData({
      name: '',
      deadline: '',
      skillsRequired: '',
      referenceDocument: '',
      budget: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Nav />
      <div className="project-form-container">
        <h2 className="form-title">Post a New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Deadline</label>
            <input type="date" className="form-input" name="deadline" value={formData.deadline} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Skills Required</label>
            <input type="text" className="form-input" name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Budget</label>
            <input type="number" className="form-input" name="budget" value={formData.budget} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Project Description</label>
            <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Reference Document/Image</label>
            <input type="file" className="form-input" name="referenceDocument" value={formData.referenceDocument} onChange={handleChange} required />
          </div>
          <button type="submit" className="form-submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ProjectPostPage;
