import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GrFormViewHide, GrFormView } from 'react-icons/gr';

function AuthForm({ onSubmitHandler, initialData, login = false }) {
  const [formData, setFormData] = useState(initialData);
  const [pwdShow, setPwdShow] = useState(false);
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onSubmit={(e) => onSubmitHandler(e, formData, setFormData)}>
      {
        !login && (
        <Form.Group className="mb-3">
          <Form.Label className="text-light">Username</Form.Label>
          <Form.Control
            type="text"
            name="name"
            aria-label="name"
            value={formData.name}
            onChange={(e) => onInputChangeHandler(e)}
            placeholder="Your Usernmame"
          />

        </Form.Group>
        )
      }

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-light">Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          aria-label="email"
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Your Email Address"
        />
        <Form.Text className="text-light">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-light">Password</Form.Label>
        <div className="d-flex gap-2 align-items-center">
          <Form.Control
            type={pwdShow ? 'text' : 'password'}
            name="password"
            id="password-field"
            value={formData.password}
            onChange={(e) => onInputChangeHandler(e)}
            placeholder="Your Password"
          />
          <button
            style={{
              background: 'white',
              outline: 'none',
              border: 'none',
              borderRadius: '50px',

            }}
            type="button"
            data-testid="toggle-password-button"
            onClick={() => setPwdShow(!pwdShow)}
          >
            {pwdShow ? <GrFormViewHide size={30} /> : <GrFormView size={30} />}

          </button>
        </div>

      </Form.Group>
      { !login && (
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label className="text-light">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          id="password-field"
          value={formData.confirmPassword}
          onChange={(e) => onInputChangeHandler(e)}
          placeholder="Confirm Your Password"
        />
      </Form.Group>
      )}

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

AuthForm.defaultProps = {
  login: false,
};

AuthForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  login: PropTypes.bool,
};

export default AuthForm;
