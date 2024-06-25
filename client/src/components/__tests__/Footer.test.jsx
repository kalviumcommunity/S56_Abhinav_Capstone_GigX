import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Footer';

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

test('renders Footer with all sections', () => {
  render(
    <Router>
      <Footer />
    </Router>
  );

  expect(screen.getByAltText(/Company Logo/i)).toBeInTheDocument();


  expect(screen.getByText(/GigX connects businesses with top-rated freelancers/i)).toBeInTheDocument();

  expect(screen.getByText(/Company/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Team/i)).toBeInTheDocument();
  expect(screen.getByText(/Careers/i)).toBeInTheDocument();
  
  expect(screen.getByText(/contactgigx@gmail.com/i)).toBeInTheDocument();

  const currentYear = new Date().getFullYear();
  expect(screen.getByText(`© ${currentYear} GigX. All rights reserved.`)).toBeInTheDocument();
});
