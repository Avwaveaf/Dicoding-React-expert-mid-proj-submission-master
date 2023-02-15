import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/authForm/AuthForm.component';
import useFetchUserData from '../../customHooks/useFetchUserData';
import { asyncLoginUserThunk } from '../../states/features/user/userSlice';

const initialData = {
  email: '',
  password: '',
};

function Login() {
  useFetchUserData('/threads');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e, formData, setFormData) => {
    e.preventDefault();

    const { name, email, password } = formData;
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(asyncLoginUserThunk(userData));
    setFormData(initialData);

    navigate('/threads');
  };

  return (
    <div className="container-md  d-flex  flex-column justify-content-center align-items-center py-auto">
      <AuthForm
        onSubmitHandler={loginHandler}
        initialData={initialData}
        login
      />
      <Link to="/register">
        Don&apos;t have an account?
      </Link>
    </div>
  );
}

export default Login;
