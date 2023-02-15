import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ThreadForm({
  onSubmitHandler, initialData,
  ...props
}) {
  const [formData, setFormData] = useState(initialData);
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Thread
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={(e) => onSubmitHandler(e, formData, setFormData)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Thread Title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Thread Category"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              name="body"
              value={formData.body}
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Write something on your mind"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>

    </Modal>

  );
}

ThreadForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ThreadForm;
