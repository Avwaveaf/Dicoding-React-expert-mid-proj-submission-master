import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import AuthForm from '../../components/authForm/AuthForm.component';
import AuthLayout from '../../components/authLayout/AuthLayout.component';
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
    <AuthLayout>
      <h1>
        <Typewriter
          options={{
            strings: ['Welcome to TalksDeed!', 'Please Login to continue... '],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      <AuthForm
        onSubmitHandler={loginHandler}
        initialData={initialData}
        login
      />
      <Link to="/register">
        Don&apos;t have an account?
      </Link>
    </AuthLayout>
  );
}

export default Login;
