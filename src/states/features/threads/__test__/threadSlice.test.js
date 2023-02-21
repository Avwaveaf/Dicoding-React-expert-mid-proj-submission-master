import reducer, { UPDATE_THREAD, UPDATE_COMMENT } from '../threadSlice';

/**
 * threads reducer
1.  Update a thread correctly
2. Update a comment correctly
 */

describe('reducer', () => {
  it('should update a thread correctly', () => {
    const initialState = {
      threads: [
        { id: 1, title: 'Thread 1', comments: [] },
        { id: 2, title: 'Thread 2', comments: [] },
      ],
    };
    const updatedThread = { id: 1, title: 'Updated Thread 1', comments: [] };
    const action = {
      type: UPDATE_THREAD,
      payload: updatedThread,
    };
    const state = reducer(initialState, action);
    expect(state.threads[0]).toEqual(updatedThread);
  });

  it('should update a comment correctly', () => {
    const initialState = {
      threads: [
        { id: 1, title: 'Thread 1', comments: [{ id: 1, content: 'Comment 1' }, { id: 2, content: 'Comment 2' }] },
        { id: 2, title: 'Thread 2', comments: [] },
      ],
    };
    const updatedComment = { threadId: 1, comment: { id: 2, content: 'Updated Comment 2' } };
    const action = {
      type: UPDATE_COMMENT,
      payload: updatedComment,
    };
    const state = reducer(initialState, action);
    expect(state.threads[0].comments[1]).toEqual(updatedComment.comment);
  });
});
