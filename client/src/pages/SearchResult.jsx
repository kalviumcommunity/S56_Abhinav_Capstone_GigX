import React, { useState, useEffect } from "react";
import axios from "axios";
import pf1 from "../assets/Profiles/pf1.png";
import Nav from "../components/Nav";

const SearchResult = ({ location }) => {
    const [searchResults, setSearchResults] = useState([]);

    const keyword = new URLSearchParams(location.search).get("keyword");
  
    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/search?keyword=${keyword}`);
          setSearchResults(response.data);
          console.log("Search results:", response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
  
      if (keyword) {
        fetchSearchResults();
      }
    }, [keyword]);
  
    return (
      <div>
        <Nav />
        <h2>Search Results for "{keyword}"</h2>
        <div className="search-results">
          {searchResults.map(user => (
            <div key={user._id} className="profile-info">
              <img src={pf1} alt={user.name} className="profile-pic" width={"50px"} />
              <div className="info">
                <h3 className="name">{user.name}</h3>
                <p> {user.email}</p>
                {user.freelancer ? (
                    <div className="div">
                  <p>Freelancer</p>
                  <p>{user.location}, {user.country}</p>
                  </div>
                ) : (
                  <p>Company</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SearchResult;
