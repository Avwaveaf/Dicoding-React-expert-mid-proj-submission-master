import React from 'react';
import PropTypes from 'prop-types';
import CustomNavbar from '../customNavbar/CustomNavbar.component';

function CustomLayout({ children }) {
  return (
    <>
      <CustomNavbar />
      <div className="py-5 mt-5">
        {children}
      </div>
    </>

  );
}
CustomLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default CustomLayout;
