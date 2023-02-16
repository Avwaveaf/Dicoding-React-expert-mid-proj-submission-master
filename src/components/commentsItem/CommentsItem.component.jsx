import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parseHTML from 'html-react-parser';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { asyncToggleDownVoteComment, asyncToggleUpVoteComment } from '../../states/features/threads/toggleVotesCommentAsyncThunks';
import VotesButton from '../votesButton/VotesButton.component';

function CommentsItem({ data, threadId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isUpVoted = useMemo(() => {
    if (user) {
      return data.upVotesBy.includes(user.id);
    }
    return false;
  }, [data.upVotesBy, user]);

  const isDownVoted = useMemo(() => {
    if (user) {
      return data.downVotesBy.includes(user.id);
    }
    return false;
  }, [data.downVotesBy, user]);

  const [voted, setVoted] = useState(() => {
    if (isUpVoted) {
      return 'up';
    }
    if (isDownVoted) {
      return 'down';
    }
    return '';
  });

  const toggleUpVotesCommentHandler = async () => {
    const commentId = data.id;
    if (voted === 'up') {
      setVoted('');
      await dispatch(asyncToggleUpVoteComment({ threadId, commentId }));
    } else {
      setVoted('up');
      await dispatch(asyncToggleUpVoteComment({ threadId, commentId }));
    }
  };
  const toggleDownVotesCommentHandler = async () => {
    const commentId = data.id;
    if (voted === 'down') {
      setVoted('');
      await dispatch(asyncToggleDownVoteComment({ threadId, commentId }));
    } else {
      setVoted('down');
      await dispatch(asyncToggleDownVoteComment({ threadId, commentId }));
    }
  };
  return (
    <Card>
      <Card.Body>
        <div className="d-flex  gap-4">
          <VotesButton
            upVotesCount={data.upVotesBy.length}
            downVotesCount={data.downVotesBy.length}
            toggleUpVoteshandler={toggleUpVotesCommentHandler}
            toggleDownVotesHandler={toggleDownVotesCommentHandler}
            voted={voted}
          />

          <div className="d-flex gap-1 w-100 ">
            <img src={data.owner.avatar} width={30} height={30} className="rounded-circle" alt="owner" />
            <div className="d-flex flex-column w-100">
              <span>{ data.owner.name}</span>
              <span className="text-secondary">{formatDate(data.createdAt)}</span>
              <hr />
              <section className="mt-2">

                {parseHTML(DOMPurify.sanitize(data.content))}
              </section>
            </div>
          </div>

        </div>
      </Card.Body>

    </Card>

  );
}
CommentsItem.propTypes = {
  data: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentsItem;
