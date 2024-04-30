import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FreelancersPage = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const locationParam = queryParams.get('location');
        const keywordParam = queryParams.get('keyword');

        let apiUrl = 'http://localhost:3000/users';

        if (locationParam || keywordParam) {
          apiUrl += `?location=${locationParam || ''}&keyword=${keywordParam || ''}`;
          setSelectedLocation(locationParam || '');
        } else if (selectedLocation) {
          apiUrl += `?location=${selectedLocation}`;
        }

        const response = await axios.get(apiUrl);
        setUsers(response.data);
        setIsLoading(false);
        setError('');
      } catch (error) {
        console.error(error);
        setError('Failed to fetch freelancers. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [location, selectedLocation, debouncedSearchInput]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <Nav setSelectedLocation={setSelectedLocation} handleSearchInputChange={handleSearchInputChange} />
      <div className="companyPage">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : users.length === 0 ? (
          <p>No freelancers found for {selectedLocation}</p>
        ) : (
          users.map(user => (
            user.freelancer && (
              <Link to={`/profile/${user.email}`} key={user._id}>
                <div key={user._id} className="card">
                  <h2 className="cardHeading">{user.name}</h2>
                  <div className="pic">
                    <img src="https://imgs.search.brave.com/otk_6KZbTk6hvwBXghj7t7PF4hklKOQkYgWpx3oIfAo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTE5NS8xMTE5/NTEwOC5wbmc" height={"50px"} alt="" />
                  </div>
                  <div className="cardContent">
                    <p className="cardText">{user.company}</p>
                    <p className="cardText">{user.email}</p>
                    <p className="cardText">{user.phone}</p>
                    <p className="cardText"><strong>{user.role}</strong></p>
                  </div>
                </div>
              </Link>
            )
          ))
        )}
      </div>
      <Footer/>
    </>
  );
};

export default FreelancersPage;
