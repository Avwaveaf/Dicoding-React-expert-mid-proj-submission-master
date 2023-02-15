import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/user/userSlice';
import threadReducer from './features/threads/threadSlice';
import leaderboardReducer from './features/leaderboards/leaderboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    leaderboards: leaderboardReducer,
  },
});
