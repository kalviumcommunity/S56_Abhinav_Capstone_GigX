// ProfileInfo.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileInfo from '../ProfileInfo';

describe('ProfileInfo Component', () => {
  test('renders profile info correctly', () => {
    const profilePic = 'profile.jpg';
    const name = 'John Doe';
    const rating = 4.5;

    render(<ProfileInfo profilePic={profilePic} name={name} rating={rating} />);

    
    const profilePicElement = screen.getByAltText('Profile');
    expect(profilePicElement).toBeInTheDocument();
    expect(profilePicElement).toHaveAttribute('src', profilePic);

    
    const nameElement = screen.getByText(name);
    expect(nameElement).toBeInTheDocument();

    const ratingElement = screen.getByText(rating.toString());
    expect(ratingElement).toBeInTheDocument();
  });
});
