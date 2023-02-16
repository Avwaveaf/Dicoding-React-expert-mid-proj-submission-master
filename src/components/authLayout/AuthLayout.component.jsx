import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

function AuthLayout({ children }) {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={6} className="d-md-block d-none">
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
          <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
          <div id="radius-shape-3" className="position-absolute shadow-5-strong" />
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="bg" className="rounded-start w-100" />
        </Col>
        <Col
          md={6}
          className="bg-glass p-5 d-flex justify-content-center flex-column align-items-center animate-from-right"
        >
          {children }
        </Col>
      </Row>
    </Container>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AuthLayout;
