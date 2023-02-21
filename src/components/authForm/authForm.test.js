import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm.component';
import '@testing-library/jest-dom/extend-expect';

/**
 * AuthForm
1. tests if the component renders correctly
2. calls onSubmitHandler with form data when Submit button is clicked
3. toggles password visibility when the eye button is clicked
4. does not show the name and confirm password fields when login prop is true
 */

describe('AuthForm', () => {
  const initialData = {
    name: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword',
    confirmPassword: 'testpassword',
  };
  const mockSubmitHandler = jest
    .fn()
    .mockImplementation((e) => e.preventDefault());
  let emit;

  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });

  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });

  afterAll(() => {
    window._virtualConsole.emit = emit;
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthForm onSubmitHandler={mockSubmitHandler} initialData={initialData} />,
    );

    expect(getByPlaceholderText('Your Usernmame')).toHaveValue('testuser');
    expect(getByPlaceholderText('Your Email Address')).toHaveValue(
      'testuser@example.com',
    );
    expect(getByPlaceholderText('Your Password')).toHaveValue('testpassword');
    expect(getByPlaceholderText('Confirm Your Password')).toHaveValue(
      'testpassword',
    );
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('calls onSubmitHandler with form data when Submit button is clicked', () => {
    const { getByText } = render(
      <AuthForm onSubmitHandler={mockSubmitHandler} initialData={initialData} />,
    );

    fireEvent.click(getByText('Submit'));

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    expect(mockSubmitHandler).toHaveBeenCalledWith(
      expect.any(Object),
      initialData,
      expect.any(Function),
    );
  });

  it('toggles password visibility when the eye button is clicked', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthForm onSubmitHandler={mockSubmitHandler} initialData={initialData} />,
    );

    expect(getByPlaceholderText('Your Password')).toHaveAttribute(
      'type',
      'password',
    );

    fireEvent.click(getByTestId('toggle-password-button'));

    expect(getByPlaceholderText('Your Password')).toHaveAttribute(
      'type',
      'text',
    );
  });

  it('does not show the name and confirm password fields when login prop is true', () => {
    const { queryByLabelText } = render(
      <AuthForm
        onSubmitHandler={mockSubmitHandler}
        initialData={initialData}
        login
      />,
    );

    expect(queryByLabelText('name')).not.toBeInTheDocument();
    expect(queryByLabelText('confirmPassword')).not.toBeInTheDocument();
  });
});
