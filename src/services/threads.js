import { axiosInstance } from '.';

const BACKEND_URL = 'https://forum-api.dicoding.dev/v1';

export const GetAllPost = async () => {
  const res = await axiosInstance.get(`${BACKEND_URL}/threads`);
  return res.data;
};

export const CreateThread = async ({ formData, user }) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads`, formData);
  return { ...res.data, data: { ...res.data.data, owner: user } };
};
export const CreateComment = async (formData, id) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${id}/comments`, formData);
  return { ...res.data, data: { ...res.data.data, threadId: id } };
};

export const GetThreadDetail = async (threadId) => {
  const res = await axiosInstance.get(`${BACKEND_URL}/threads/${threadId}`);
  return res.data;
};
export const UpVotesThreadApi = async (threadId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/up-vote`);
  return res.data;
};
export const DownVotesThreadApi = async (threadId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/down-vote`);
  return res.data;
};
export const NeutralizeVotesThreadApi = async (threadId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/neutral-vote`);
  return res.data;
};
export const DownVotesCommentApi = async (threadId, commentId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/comments/${commentId}/down-vote`);
  return res.data;
};
export const UpVotesCommentApi = async (threadId, commentId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/comments/${commentId}/up-vote`);
  return res.data;
};
export const NeutralizeVotesCommentApi = async (threadId, commentId) => {
  const res = await axiosInstance.post(`${BACKEND_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`);
  return res.data;
};
