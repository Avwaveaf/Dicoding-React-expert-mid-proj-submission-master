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

    const { email, password } = formData;
    const userData = {
      email,
      password,
    };
    const res = await dispatch(asyncLoginUserThunk(userData));
    setFormData(initialData);
    if (!res.error) {
      navigate('/threads');
    }
  };

  return (
    <AuthLayout>
      <h2 className="d-flex gap-2 text-light">

        <Typewriter
          options={{
            strings: ['Welcome to TalksDeed!', 'Login to continue '],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>

      <AuthForm
        onSubmitHandler={loginHandler}
        initialData={initialData}
        login
      />
      <Link to="/register" className="text-light">
        Don&apos;t have an account?
      </Link>
    </AuthLayout>
  );
}

export default Login;
