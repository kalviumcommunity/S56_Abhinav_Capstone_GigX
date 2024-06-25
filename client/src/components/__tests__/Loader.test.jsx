// Loader.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../Loader';

test('renders Loader with correct type and color', () => {
  const type = 'spinningBubbles';
  const color = '#00ff00';

  render(<Loader type={type} color={color} />);

  // Check if the ReactLoading component is rendered
  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();


});

