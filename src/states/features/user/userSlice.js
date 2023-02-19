import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { GetOwnProfileHandler, LoginUserHandler, RegisterUserHandler } from '../../../services/auth';

export const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  message: ' ',
};

export const asyncGetOwnProfileThunk = createAsyncThunk(
  'auth/getOwnProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await GetOwnProfileHandler();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const asyncRegisterUserThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      return await RegisterUserHandler(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const asyncLoginUserThunk = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      return await LoginUserHandler(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, { payload }) {
      state.isLoggedIn = payload;
    },
    SET_LOGOUT_USER(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => builder
    .addCase(asyncRegisterUserThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncRegisterUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      state.message = payload.message;
      toast.success(payload.message);
    })
    .addCase(asyncRegisterUserThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    })
    .addCase(asyncLoginUserThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncLoginUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      localStorage.setItem('token', payload.data.token);
      state.message = payload.message;
      toast.success(payload.message);
    })
    .addCase(asyncLoginUserThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      localStorage.removeItem('token');
    })
    .addCase(asyncGetOwnProfileThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncGetOwnProfileThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = payload.data.user;
    })
    .addCase(asyncGetOwnProfileThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.message = payload;
      localStorage.removeItem('token');
      toast.error(payload);
    }),
});

export const { SET_LOGIN, SET_LOGOUT_USER } = userSlice.actions;

export default userSlice.reducer;
