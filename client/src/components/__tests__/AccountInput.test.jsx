import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import AccountInput from '../AccountInput';

test('renders input with placeholder and value', () => {
  render(
    <AccountInput
      fieldName="testField"
      value="testValue"
      editMode={false}
      placeholder="Enter value"
      onChange={() => {}}
    />
  );

  const inputElement = screen.getByPlaceholderText(/Enter value/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe('testValue');
});

test('input is read-only when editMode is false', () => {
  render(
    <AccountInput
      fieldName="testField"
      value="testValue"
      editMode={false}
      placeholder="Enter value"
      onChange={() => {}}
    />
  );

  const inputElement = screen.getByPlaceholderText(/Enter value/i);
  expect(inputElement).toHaveAttribute('readonly');
});

test('input is editable when editMode is true', () => {
  const handleChange = jest.fn();

  render(
    <AccountInput
      fieldName="testField"
      value="testValue"
      editMode={true}
      placeholder="Enter value"
      onChange={handleChange}
    />
  );

  const inputElement = screen.getByPlaceholderText(/Enter value/i);
  expect(inputElement).not.toHaveAttribute('readonly');

  fireEvent.change(inputElement, { target: { value: 'newValue' } });
  expect(handleChange).toHaveBeenCalledWith('newValue');
});
