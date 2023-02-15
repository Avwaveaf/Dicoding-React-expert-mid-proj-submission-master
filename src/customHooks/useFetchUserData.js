import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useFetchUserData = (path) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        toast.success(`Welcome back ${user.name}`);
        navigate(path);
      }
    };
    fetchUserData();
  }, [user, token]);
};

export default useFetchUserData;
