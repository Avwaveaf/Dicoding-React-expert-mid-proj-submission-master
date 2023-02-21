import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NotFound() {
  return (

    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Row className="d-flex w-100 justify-content-center">
        <Col md={6} className="text-center  my-auto">
          <h1 className="display-4 mb-3 text-white">404 - Page Not Found</h1>
          <p className="lead" />
        </Col>
      </Row>
    </Container>

  );
}

export default NotFound;
