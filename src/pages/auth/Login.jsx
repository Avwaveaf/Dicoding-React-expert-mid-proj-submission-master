import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/authForm/AuthForm.component';
import useFetchUserData from '../../customHooks/useFetchUserData';
import { asyncGetOwnProfileThunk, asyncLoginUserThunk } from '../../states/features/user/userSlice';

const initialData = {
  email: '',
  password: '',
};

function Login() {
  useFetchUserData('/');
  const { isLoading } = useSelector((state) => state.auth);
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

    navigate('/');
  };

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
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
    </>
  );
}

export default Login;
