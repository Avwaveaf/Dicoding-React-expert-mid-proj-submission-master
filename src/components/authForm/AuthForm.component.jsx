import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AuthForm({ onSubmitHandler, initialData, login = false }) {
  const [formData, setFormData] = useState(initialData);
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onSubmit={(e) => onSubmitHandler(e, formData, setFormData)}>
      <Form.Group className={`mb-3 ${login && 'd-none'}`}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Your Usernmame"
        />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Your Email Address"
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Your Password"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${login && 'd-none'}`} controlId="formBasicPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Confirm Your Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

AuthForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  login: PropTypes.bool.isRequired,
};

export default AuthForm;
