import { createAsyncThunk } from '@reduxjs/toolkit';
import { DownVotesCommentApi, NeutralizeVotesCommentApi, UpVotesCommentApi } from '../../../services/threads';
import { UPDATE_COMMENT } from './threadSlice';

export const asyncToggleUpVoteComment = createAsyncThunk(
  'threads/upVoteComment',
  async ({ threadId, commentId }, { getState, dispatch }) => {
    // optimistically update approach
    const userId = getState().auth.user.id;
    const currThread = getState().threads.threads;
    const threadFound = currThread.find((thread) => thread.id === threadId);
    const currComment = threadFound.comments.find((comment) => comment.id === commentId);

    // check if user already liked the comment. if does neutralize the comment upcvotes
    if (currComment.upVotesBy.includes(userId)) {
      console.log('userId found in like comment ');
      const updatedUpVotesBy = currComment.upVotesBy.filter((user) => user !== userId);
      const updatedComment = {
        ...currComment,
        upVotesBy: updatedUpVotesBy,
      };

      await dispatch(UPDATE_COMMENT({ threadId, comment: updatedComment }));
      try {
        return await NeutralizeVotesCommentApi(threadId, commentId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalComment = currThread.comments.find((comment) => comment.id === commentId);
        return dispatch(UPDATE_COMMENT({ threadId, comment: originalComment }));
      }
    } else {
      const updatedDownVotesBy = currComment.downVotesBy.filter((user) => user !== userId);
      const updatedComment = {
        ...currComment,
        downVotesBy: currComment.downVotesBy.includes(userId)
          ? updatedDownVotesBy
          : currComment.downVotesBy,
        upVotesBy: [...currComment.upVotesBy, userId],
      };

      await dispatch(UPDATE_COMMENT({ threadId, comment: updatedComment }));
      try {
        return await UpVotesCommentApi(threadId, commentId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalComment = currThread.comments.find((comment) => comment.id === commentId);
        return dispatch(UPDATE_COMMENT({ threadId, comment: originalComment }));
      }
    }
  },
); export const asyncToggleDownVoteComment = createAsyncThunk(
  'threads/downVoteComment',
  async ({ threadId, commentId }, { getState, dispatch }) => {
    // optimistically update approach
    const userId = getState().auth.user.id;
    const currThread = getState().threads.threads;
    const threadFound = currThread.find((thread) => thread.id === threadId);
    const currComment = threadFound.comments.find((comment) => comment.id === commentId);

    // check if user already disliked the comment. if does neutralize the comment downVotes
    if (currComment.downVotesBy.includes(userId)) {
      console.log('userId found in dislike comment ');
      const updatedDownVotesBy = currComment.downVotesBy.filter((user) => user !== userId);
      const updatedComment = {
        ...currComment,
        downVotesBy: updatedDownVotesBy,
      };

      await dispatch(UPDATE_COMMENT({ threadId, comment: updatedComment }));
      try {
        return await NeutralizeVotesCommentApi(threadId, commentId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalComment = currThread.comments.find((comment) => comment.id === commentId);
        return dispatch(UPDATE_COMMENT({ threadId, comment: originalComment }));
      }
    } else {
      const updatedUpVotesBy = currComment.upVotesBy.filter((user) => user !== userId);
      const updatedComment = {
        ...currComment,
        upVotesBy: currComment.upVotesBy.includes(userId)
          ? updatedUpVotesBy
          : currComment.upVotesBy,
        downVotesBy: [...currComment.downVotesBy, userId],
      };

      await dispatch(UPDATE_COMMENT({ threadId, comment: updatedComment }));
      try {
        return await DownVotesCommentApi(threadId, commentId);
      } catch (error) {
        // revert the optimistic update if api call fails
        const originalComment = currThread.comments.find((comment) => comment.id === commentId);
        return dispatch(UPDATE_COMMENT({ threadId, comment: originalComment }));
      }
    }
  },
);
