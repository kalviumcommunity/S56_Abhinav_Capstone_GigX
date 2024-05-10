import { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./Styles/ProjectPost.css";
import Nav from '../components/Nav';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProjectPostPage = () => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    skillsRequired: '',
    referenceDocument: '',
    budget: '',
    description: ''
  });

  useEffect(() => {
    
    const fetchCurrentUser = async () => {
      const userEmail = Cookies.get("email");
      try {
        const response = await axios.get(`${API}/users/${userEmail}`);
        setUser(response.data);
        
       
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser(); 
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const projectData = {
  user: user._id,
  projectName: formData.name,
  endDate: formData.deadline,
  skillsRequired: formData.skillsRequired,
  referenceDocument: formData.referenceDocument,
  budget: parseInt(formData.budget),
  description: formData.description,
};
    try {
      
      const response = await axios.post(`${API}/projects`, projectData);
      navigate("/account")
    } catch (error) {
      console.error('Error posting project:', error);
    }
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
        {user && (
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
              <input type="text" className="form-input" name="referenceDocument" value={formData.referenceDocument} onChange={handleChange} required />
            </div>
            <button type="submit" className="form-submit-btn">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProjectPostPage;

