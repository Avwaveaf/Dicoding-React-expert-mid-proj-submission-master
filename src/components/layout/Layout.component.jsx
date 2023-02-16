import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import CustomNavbar from '../customNavbar/CustomNavbar.component';

function CustomLayout({ children }) {
  return (
    <>
      <CustomNavbar />
      <Container className="py-5 mt-5">
        {children}
      </Container>
    </>

  );
}
CustomLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default CustomLayout;
