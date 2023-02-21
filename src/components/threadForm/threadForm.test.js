import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ThreadForm from './ThreadForm.component';
import '@testing-library/jest-dom/extend-expect';

/**
 * CommentsItem
1.  "ThreadForm" component is rendered correctly by checking the presence of
    the modal title, submit button, and input fields for title, category, and body.
2. checks if the "onSubmitHandler" function is called when the user submits the form
 */

describe('ThreadForm', () => {
  let emit;
  const onSubmitHandler = jest.fn();
  const initialData = {
    title: '',
    category: '',
    body: '',
  };

  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });

  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });

  afterAll(() => {
    window._virtualConsole.emit = emit;
  });

  it('renders the modal and form correctly', () => {
    const handleClose = jest.fn();
    render(
      <ThreadForm
        onSubmitHandler={onSubmitHandler}
        initialData={initialData}
        show
        onHide={handleClose}
      />,
    );

    const modalTitle = screen.getByText('Create Thread');
    expect(modalTitle).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    const titleInput = screen.getByTestId('title');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe('');

    const categoryInput = screen.getByTestId('category');
    expect(categoryInput).toBeInTheDocument();
    expect(categoryInput.value).toBe('');

    const bodyInput = screen.getByTestId('body');
    expect(bodyInput).toBeInTheDocument();
    expect(bodyInput.value).toBe('');
  });

  it('calls the submit handler when form is submitted', () => {
    const handleClose = jest.fn();
    render(
      <ThreadForm
        onSubmitHandler={onSubmitHandler}
        initialData={initialData}
        show
        onHide={handleClose}
      />,
    );

    const titleInput = screen.getByTestId('title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    const categoryInput = screen.getByTestId('category');
    fireEvent.change(categoryInput, { target: { value: 'Test Category' } });

    const bodyInput = screen.getByTestId('body');
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
    expect(onSubmitHandler).toHaveBeenCalledWith(expect.any(Object), {
      title: 'Test Title',
      category: 'Test Category',
      body: 'Test Body',
    }, expect.any(Function));
  });
});
