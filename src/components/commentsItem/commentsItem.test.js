import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CommentsItem from './CommentsItem.component';
import '@testing-library/jest-dom/extend-expect';
import VotesButton from '../votesButton/VotesButton.component';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * CommentsItem
1. component should render correctly with initial data
2. should trigger correct action thunk when upvote button is clicked
3. should trigger corrent action thunk when downvote button is clicked

 */

describe('CommentsItem component', () => {
  let store;
  const comment = {
    id: '123',
    owner: {
      id: 'user1',
      name: 'John Doe',
      avatar: 'http://example.com/avatar.jpg',
    },
    content: '<p>Hello, world!</p>',
    createdAt: '2022-02-01T12:00:00.000Z',
    upVotesBy: ['user1'],
    downVotesBy: [],
  };
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: { id: 'user1' },
      },
      thread: {
        comments: [comment],
      },
    });
  });

  it('should render correctly', () => {
    // Arrange
    const { getByTestId } = render(
      <Provider store={store}>
        <CommentsItem data={comment} threadId="456" />
      </Provider>,
    );
    //
    const commentOwnerName = getByTestId('comments-owner-name');
    const commentContent = getByTestId('comments-content');
    const commentCreatedAt = getByTestId('comments-createdAt');
    const commentOwnerImgUrl = getByTestId('comments-imgUrl');
    const upVotesButtonCount = getByTestId('upVoted-button');
    const downVotesButtonCount = getByTestId('downVoted-button');

    expect(commentOwnerName).toHaveTextContent('John Doe');
    expect(commentContent).toHaveTextContent('Hello, world!');
    expect(commentCreatedAt).toHaveTextContent('01/02/2022');
    expect(commentOwnerImgUrl).toHaveAttribute('src', 'http://example.com/avatar.jpg');
    expect(upVotesButtonCount).toHaveTextContent('1');
    expect(downVotesButtonCount).toHaveTextContent('0');
  });

  it('should trigger correct action thunk when upvote button is clicked', async () => {
    const mockToggleDownVotesHandler = jest.fn();
    const mockToggleUpVotesHandler = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <CommentsItem data={comment} threadId="456">
          <VotesButton
            toggleUpVoteshandler={mockToggleUpVotesHandler}
            toggleDownVotesHandler={mockToggleDownVotesHandler}
            downVotesCount={comment.downVotesBy.length}
            upVotesCount={comment.upVotesBy.length}
            voted="down"
          />
        </CommentsItem>
      </Provider>,
    );
    const upvoteButton = getByTestId('upVoted-button');

    fireEvent.click(upvoteButton);

    const expectedPayload = {
      type: 'threads/upVoteComment/pending',
    };
    expect(store.getActions()[0].type).toEqual(expectedPayload.type);

    const currentComment = store.getState().thread.comments.find((item) => item.id === '123');
    expect(currentComment.upVotesBy).toEqual(['user1']);
  });

  it('should trigger corrent action thunk when downvote button is clicked', async () => {
    const mockToggleDownVotesHandler = jest.fn();
    const mockToggleUpVotesHandler = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <CommentsItem data={comment} threadId="456">
          <VotesButton
            downVotesCount={comment.downVotesBy.length}
            toggleUpVoteshandler={mockToggleUpVotesHandler}
            toggleDownVotesHandler={mockToggleDownVotesHandler}
            upVotesCount={comment.upVotesBy.length}
            voted="down"
          />
        </CommentsItem>
      </Provider>,
    );
    // component.debug();
    const downvoteButton = getByTestId('downVoted-button');

    fireEvent.click(downvoteButton);

    const actions = store.getActions();
    const expectedPayload = {
      type: 'threads/downVoteComment/pending',
    };
    expect(actions[0].type).toEqual(expectedPayload.type);
  });
});
