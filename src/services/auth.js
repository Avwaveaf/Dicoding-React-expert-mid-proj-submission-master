import axios from 'axios';
import { axiosInstance } from '.';

const BACKEND_URL = 'https://forum-api.dicoding.dev/v1';

export const RegisterUserHandler = async (payload) => {
  const res = await axios.post(`${BACKEND_URL}/register`, payload);
  return res.data;
};
export const LoginUserHandler = async (payload) => {
  const res = await axios.post(`${BACKEND_URL}/login`, payload);
  axiosInstance.defaults.headers.authorization = `Bearer ${res.data.data.token}`;
  return res.data;
};

export const GetOwnProfileHandler = async () => {
  const res = await axiosInstance.get(`${BACKEND_URL}/users/me`);
  return res.data;
};
