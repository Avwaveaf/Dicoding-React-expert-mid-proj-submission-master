import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/authForm/AuthForm.component';
import useFetchUserData from '../../customHooks/useFetchUserData';
import { asyncRegisterUserThunk } from '../../states/features/user/userSlice';

const initialData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register() {
  useFetchUserData('/threads');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = async (e, formData) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(asyncRegisterUserThunk(userData));
    navigate('/login');
  };

  return (
    <div className="container-md  d-flex  flex-column justify-content-center align-items-center py-auto">
      <AuthForm onSubmitHandler={registerHandler} initialData={initialData} />

      <Link to="/login">
        Already have an account?
      </Link>

    </div>
  );
}

export default Register;
