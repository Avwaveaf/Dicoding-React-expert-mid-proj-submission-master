import { axiosInstance } from '.';

const BACKEND_URL = 'https://forum-api.dicoding.dev/v1';

export const GetLeaderboardsData = async () => {
  const res = await axiosInstance.get(`${BACKEND_URL}/leaderboards`);
  return res.data;
};
