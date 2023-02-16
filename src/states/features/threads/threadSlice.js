import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
  CreateComment,
  CreateThread,
  GetAllPost,
  GetThreadDetail,

} from '../../../services/threads';

const initialState = {
  threads: [],
  thread: null,
  isLoading: false,
  message: '',
  isError: false,
  categories: [],
};

export const asyncGetAllPost = createAsyncThunk(
  'thread/getAllPost',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const allPostsResponse = await GetAllPost();
      const allPosts = allPostsResponse.data.threads;
      // Fetch owner information for each post
      const ownerPromises = allPosts.map((post) => GetThreadDetail(post.id));
      const ownerResponses = await Promise.all(ownerPromises);
      const owners = ownerResponses.map((response) => response.data.detailThread.owner);
      const comments = ownerResponses.map((response) => response.data.detailThread.comments);
      // Attach owner information to each post
      const postsWithOwnersAndComments = allPosts.map((post, index) => ({
        ...post,
        owner: owners[index],
        comments: comments[index],
      }));
      return { data: { threads: postsWithOwnersAndComments }, message: 'Success' };
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  },
);
export const asyncCreateThreadThunk = createAsyncThunk(
  'threads/createThread',
  async ({ formData, user }, thunkAPI) => {
    try {
      return await CreateThread({ formData, user });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  },
);
export const asyncCreateCommentThunk = createAsyncThunk(
  'threads/createComment',
  async ({ comment, id }, thunkAPI) => {
    try {
      return await CreateComment(comment, id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  },
);
export const asyncGetThreadDetailThunk = createAsyncThunk(
  'threads/getDetail',
  async (threadId, thunkAPI) => {
    try {
      return await GetThreadDetail(threadId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  },
);
const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    UPDATE_THREAD(state, { payload }) {
      const index = state.threads.findIndex((thread) => thread.id === payload.id);
      state.threads[index] = payload;
    },
    UPDATE_COMMENT(state, { payload }) {
      const index = state.threads.findIndex((thread) => thread.id === payload.threadId);
      const commentIndex = state.threads[index].comments
        .findIndex((comment) => comment.id === payload.comment.id);
      state.threads[index].comments[commentIndex] = payload.comment;
    },

  },
  extraReducers: (builder) => builder
    .addCase(asyncGetAllPost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncGetAllPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.threads = payload.data.threads;
      state.message = payload.message;
    })
    .addCase(asyncGetAllPost.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.message = payload;
      toast.error(payload);
    })
    .addCase(asyncCreateThreadThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncCreateThreadThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      toast.success(payload.message);
      const newThread = payload.data.thread;
      newThread.owner = payload.data.owner;

      state.threads = [newThread, ...state.threads];
    })
    .addCase(asyncCreateThreadThunk.rejected, (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
      toast.error(payload);
    })
    .addCase(asyncGetThreadDetailThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncGetThreadDetailThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.message = payload.message;
      state.thread = payload.data.detailThread;
      toast.success(payload.message);
    })
    .addCase(asyncGetThreadDetailThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isError = true;
      toast.error(payload);
    })
    .addCase(asyncCreateCommentThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncCreateCommentThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const id = payload.data.threadId;
      const threadIndex = state.threads.findIndex((thread) => thread.id === id);
      if (state.threads[threadIndex].comments) {
        state.threads[threadIndex].comments.unshift(payload.data.comment);
      } else if (state.threads[threadIndex].comments === undefined) {
        state.threads[threadIndex] = {
          ...state.threads[threadIndex],
          comments: [payload.data.comment],
        };
      }

      state.message = payload.message;
      toast.success(payload.message);
    })
    .addCase(asyncCreateCommentThunk.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.message = payload;
      toast.error(payload);
    }),

});

export const { UPDATE_THREAD, UPDATE_COMMENT } = threadSlice.actions;

export default threadSlice.reducer;
