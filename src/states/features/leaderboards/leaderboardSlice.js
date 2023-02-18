import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { GetLeaderboardsData } from '../../../services/leaderboards';

const initialState = {
  leaderboards: [],
};
export const asyncGetLeaderboardsDataThunk = createAsyncThunk(
  'leaderboards/getAllData',
  async (formData, thunkAPI) => {
    try {
      return await GetLeaderboardsData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || error.message);
    }
  },
);
const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(asyncGetLeaderboardsDataThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(asyncGetLeaderboardsDataThunk.fulfilled, (state, { payload }) => {

    })
    .addCase(asyncGetLeaderboardsDataThunk.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.message = payload;
      toast.error(payload);
    }),
});

export const {} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
