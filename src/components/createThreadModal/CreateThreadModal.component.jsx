import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThreadThunk, asyncGetAllPost } from '../../states/features/threads/threadSlice';
import ThreadForm from '../threadForm/ThreadForm.component';

const initialData = {
  title: '',
  body: '',
  category: '',
};

function CreateThreadModal() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isError } = useSelector((state) => state.threads);

  const createThreadSubmitHandler = async (e, formData, setFormData) => {
    e.preventDefault();
    await dispatch(asyncCreateThreadThunk({ formData, user }));
    setFormData(initialData);
    setModalShow(false);
  };

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  return (
    <div>
      <button type="button" onClick={() => setModalShow(true)}>+</button>
      <ThreadForm
        initialData={initialData}
        onSubmitHandler={createThreadSubmitHandler}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default CreateThreadModal;
