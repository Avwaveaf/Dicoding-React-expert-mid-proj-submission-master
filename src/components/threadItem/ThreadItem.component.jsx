import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import {
  Card, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import parseHTML from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import CommentsList from '../commentsList/CommentsList.component';
import { asyncCreateCommentThunk } from '../../states/features/threads/threadSlice';
import { asyncToggleDownVoteThread, asyncToggleUpVoteThread } from '../../states/features/threads/toggleVotesThreadAsyncThunks';
import VotesButton from '../votesButton/VotesButton.component';

const tooltip = (
  <Tooltip id="tooltip">
    <strong>press ↵ or return </strong>
    {' '}
    to post a comment.
  </Tooltip>
);

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
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addCommentHandler = async () => {
    await dispatch(asyncCreateCommentThunk({ comment, id }));
    setComment({ content: '' });
  };

  const isUpVoted = useMemo(() => {
    if (user) {
      return upVotesBy.includes(user.id);
    }
    return false;
  }, [upVotesBy, user]);

  const isDownVoted = useMemo(() => {
    if (user) {
      return downVotesBy.includes(user.id);
    }
    return false;
  }, [downVotesBy, user]);

  const [voted, setVoted] = useState(() => {
    if (isUpVoted) {
      return 'up';
    }
    if (isDownVoted) {
      return 'down';
    }
    return '';
  });

  const handleUpVotesThread = async () => {
    if (voted === 'up') {
      setVoted('');
      await dispatch(asyncToggleUpVoteThread(id));
    } else {
      setVoted('up');
      await dispatch(asyncToggleUpVoteThread(id));
    }
  };
  const handleDownVotesThread = async () => {
    if (voted === 'down') {
      setVoted('');
      await dispatch(asyncToggleDownVoteThread(id));
    } else {
      setVoted('down');
      await dispatch(asyncToggleDownVoteThread(id));
    }
  };
  return (
    <Card className="bg-light">

      <Card.Header>

        <div className="d-flex px-3 justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <img src={owner.avatar} loading="lazy" className="rounded-circle" alt="owner" />
            <span>{owner.name }</span>
          </div>
          <VotesButton
            upVotesCount={upVotesBy.length}
            downVotesCount={downVotesBy.length}
            toggleUpVoteshandler={handleUpVotesThread}
            toggleDownVotesHandler={handleDownVotesThread}
            voted={voted}
          />
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

      <Card.Footer className="p-0">

        <InputGroup className="p-1">
          <InputGroup.Text className="d-flex gap-2" id="basic-addon2">
            <img src={user?.avatar} width={25} height={25} className="rounded-circle" alt="user" />
            {user?.name }
          </InputGroup.Text>
          <OverlayTrigger placement="bottom" overlay={tooltip}>

            <Form.Control
              placeholder="Add comment"
              type="text"
              name="content"
              value={comment.content}
              onChange={(e) => setComment({ [e.target.name]: e.target.value })}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  addCommentHandler();
                }
              }}
              autocomplete="off"
            />
          </OverlayTrigger>

        </InputGroup>

        <CommentsList comments={comments} threadId={id} />
      </Card.Footer>

    </Card>

  );
}
ThreadItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ThreadItem;
