import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncGetOwnProfileThunk } from '../states/features/user/userSlice';

const useRedirectLoggedOut = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      if (!token && !user) {
        toast.error('You are not authorized, please login first...');
        navigate(path);
      } else if (!user && token) {
        const res = await dispatch(asyncGetOwnProfileThunk());
        if (res.error) {
          navigate(path);
        }
      }
    };
    redirectLoggedOutUser();
  }, [isLoggedIn, token, dispatch, user, path]);
};

export default useRedirectLoggedOut;
