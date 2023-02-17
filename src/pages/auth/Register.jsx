import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import AuthForm from '../../components/authForm/AuthForm.component';
import AuthLayout from '../../components/authLayout/AuthLayout.component';
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
    const {
      name, email, password, confirmPassword,
    } = formData;
    if (password !== confirmPassword) {
      return toast.error('Your password not match');
    }
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(asyncRegisterUserThunk(userData));
    return navigate('/login');
  };

  return (
    <AuthLayout>
      <h1 className="d-flex gap-2 text-light">

        <Typewriter
          options={{
            strings: ['Welcome to TalksDeed!', 'Register to continue... '],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <AuthForm onSubmitHandler={registerHandler} initialData={initialData} />

      <Link to="/login" className="text-light">
        Already have an account?
      </Link>

    </AuthLayout>
  );
}

export default Register;
