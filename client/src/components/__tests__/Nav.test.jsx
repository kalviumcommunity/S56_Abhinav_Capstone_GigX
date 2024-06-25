// Nav.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../Nav';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  remove: jest.fn(),
}));

describe('Nav Component', () => {
  beforeEach(() => {
    Cookies.get.mockImplementation(() => undefined);
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Companies/i)).toBeInTheDocument();
    expect(screen.getByText(/Freelancers/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test('location selection works', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    const locationSelect = screen.getByRole('combobox');
    
    fireEvent.change(locationSelect, { target: { value: 'Mumbai' } });

    expect(locationSelect.value).toBe('Mumbai');
    expect(mockedNavigate).toHaveBeenCalledWith('/freelancers?location=Mumbai');
  });

  test('login state handling', () => {
    Cookies.get.mockImplementation(() => 'mocked_token'); 

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();

    
    fireEvent.click(screen.getByText(/Sign Out/i));

    
    expect(mockedNavigate).toHaveBeenCalledWith('/');
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
