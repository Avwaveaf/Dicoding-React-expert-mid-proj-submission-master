import { createAsyncThunk } from '@reduxjs/toolkit';
import { DownVotesThreadApi, NeutralizeVotesThreadApi, UpVotesThreadApi } from '../../../services/threads';
import { UPDATE_THREAD } from './threadSlice';

export const asyncToggleUpVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async (threadId, { getState, dispatch }) => {
    // optimistically update approach
    const userId = getState().auth.user.id;
    const currThread = getState().threads.threads;
    const threadFound = currThread.find((thread) => thread.id === threadId);
    // check if user already liked the post. if does neutralize the thread upcvotes
    if (threadFound.upVotesBy.includes(userId)) {
      const updatedUpVotesBy = threadFound.upVotesBy.filter((user) => user !== userId);
      const updatedThread = {
        ...threadFound,
        upVotesBy: updatedUpVotesBy,
      };

      await dispatch(UPDATE_THREAD(updatedThread));
      try {
        return await NeutralizeVotesThreadApi(threadId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalThread = getState().threads.threads.find((thread) => thread.id === threadId);
        return dispatch(UPDATE_THREAD(originalThread));
      }
    } else {
      const updatedDownVotesBy = threadFound.downVotesBy.filter((user) => user !== userId);
      const updatedThread = {
        ...threadFound,
        downVotesBy: threadFound.downVotesBy.includes(userId)
          ? updatedDownVotesBy
          : threadFound.downVotesBy,
        upVotesBy: [...threadFound.upVotesBy, userId],
      };

      await dispatch(UPDATE_THREAD(updatedThread));
      try {
        return await UpVotesThreadApi(threadId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalThread = getState().threads.threads.find((thread) => thread.id === threadId);
        return dispatch(UPDATE_THREAD(originalThread));
      }
    }
  },
);
export const asyncToggleDownVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async (threadId, { getState, dispatch }) => {
    // optimistically update approach
    const userId = getState().auth.user.id;
    const currThread = getState().threads.threads;
    const threadFound = currThread.find((thread) => thread.id === threadId);
    // check if user already liked the post. if does neutralize the thread upcvotes
    if (threadFound.downVotesBy.includes(userId)) {
      const updatedDownVotesBy = threadFound.downVotesBy.filter((user) => user !== userId);
      const updatedThread = {
        ...threadFound,
        downVotesBy: updatedDownVotesBy,
      };

      await dispatch(UPDATE_THREAD(updatedThread));
      try {
        return await NeutralizeVotesThreadApi(threadId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalThread = getState().threads.threads.find((thread) => thread.id === threadId);
        return dispatch(UPDATE_THREAD(originalThread));
      }
    } else {
      const updatedUpVotesBy = threadFound.upVotesBy.filter((user) => user !== userId);
      const updatedThread = {
        ...threadFound,
        downVotesBy: [...threadFound.downVotesBy, userId],
        upVotesBy: threadFound.upVotesBy.includes(userId)
          ? updatedUpVotesBy : threadFound.upVotesBy,
      };

      await dispatch(UPDATE_THREAD(updatedThread));
      try {
        return await DownVotesThreadApi(threadId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalThread = getState().threads.threads.find((thread) => thread.id === threadId);
        return dispatch(UPDATE_THREAD(originalThread));
      }
    }
  },
);
