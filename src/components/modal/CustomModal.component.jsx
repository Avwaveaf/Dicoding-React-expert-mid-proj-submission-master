import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

function CustomModal({ children, ...props }) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        onClick={props.onHide}
        style={{
          display: 'flex',
          background: 'transparent',
          width: 'fit-content',
          alignSelf: 'end',
          border: 'none',
        }}
      >
        X

      </button>
      <Modal.Body>
        {children }
      </Modal.Body>

    </Modal>
  );
}

CustomModal.propTypes = {
  children: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default CustomModal;
