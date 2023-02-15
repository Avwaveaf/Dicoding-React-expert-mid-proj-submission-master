import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import parseHTML from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import formatDate from '../../services/formatDate';
import CommentsList from '../commentsList/CommentsList.component';
import { asyncCreateCommentThunk } from '../../states/features/threads/threadSlice';
import { asyncToggleDownVoteThread, asyncToggleUpVoteThread } from '../../states/features/threads/toggleVotesThreadAsyncThunks';

function ThreadItem({ data = {} }) {
  const {
    id,
    title,
    body,
    createdAt,
    owner,
    comments,
    upVotesBy,
    downVotesBy,
  } = data;
  const [comment, setComment] = useState({ content: '' });
  const dispatch = useDispatch();
  const addCommentHandler = async () => {
    await dispatch(asyncCreateCommentThunk({ comment, id }));
    setComment({ content: '' });
  };

  const handleUpVotesThread = async () => {
    await dispatch(asyncToggleUpVoteThread(id));
  };
  const handleDownVotesThread = async () => {
    await dispatch(asyncToggleDownVoteThread(id));
  };
  return (
    <Card>
      <div className=" d-flex gap-3 flex-column align-items-center justify-content-center">

        <button onClick={handleUpVotesThread} type="button" className="d-flex align-items-center">
          <BiUpvote size={30} />
          {upVotesBy.length }
        </button>
        <button onClick={handleDownVotesThread} type="button" className="d-flex align-items-center">
          <BiDownvote size={30} />
          {downVotesBy.length }
        </button>
      </div>

      <Card.Header>
        {' '}
        <div>
          <img src={owner.avatar} className="rounded-circle" alt="owner" />
          <span>{owner.name }</span>
        </div>

      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <span>{formatDate(createdAt) }</span>
        <div className="p-3">
          { parseHTML(DOMPurify.sanitize(body))}
        </div>
        <Link to={`/threads/${id}`}>see details</Link>
      </Card.Body>
      <Card.Footer><CommentsList comments={comments} threadId={id} /></Card.Footer>
      <input type="text" name="content" value={comment.content} onChange={(e) => setComment({ [e.target.name]: e.target.value })} placeholder="Add Comment.." />
      <button type="button" onClick={addCommentHandler}>Add Comment</button>
    </Card>

  );
}
ThreadItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ThreadItem;
