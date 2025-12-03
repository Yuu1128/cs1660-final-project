import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthForm } from './components/AuthForm';

test('renders auth form', () => {
  const mockSubmit = jest.fn();
  const mockModeSwitch = jest.fn();
  
  render(
    <AuthForm 
      mode="login" 
      onSubmit={mockSubmit} 
      onModeSwitch={mockModeSwitch} 
    />
  );
  
  const loginElement = screen.getByText(/Sign in to your account/i);
  expect(loginElement).toBeInTheDocument();
});
