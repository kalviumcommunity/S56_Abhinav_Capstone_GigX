import React from 'react';
import './Styles/ProfileInfo.css';

const ProfileInfo = ({ profilePic, name, rating }) => {
  return (
    <div className="profile-info">
      <div className="profile-pic">
        <img src={profilePic} alt="Profile" />
      </div>
      <div className="info">
        <div className="name">{name}</div>
        <div className="rating">{rating}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
