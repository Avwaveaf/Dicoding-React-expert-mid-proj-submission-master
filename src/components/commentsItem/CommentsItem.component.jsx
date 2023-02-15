import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parseHTML from 'html-react-parser';
import Card from 'react-bootstrap/Card';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import formatDate from '../../services/formatDate';
import { asyncToggleDownVoteComment, asyncToggleUpVoteComment } from '../../states/features/threads/toggleVotesCommentAsyncThunks';

function CommentsItem({ data, threadId }) {
  const dispatch = useDispatch();
  const toggleUpVotesCommentHandler = async () => {
    const commentId = data.id;
    await dispatch(asyncToggleUpVoteComment({ threadId, commentId }));
  };
  const toggleDownVotesCommentHandler = async () => {
    const commentId = data.id;
    await dispatch(asyncToggleDownVoteComment({ threadId, commentId }));
  };
  return (
    <Card>
      <Card.Body>
        <div className="d-flex  gap-4">
          <div className=" d-flex gap-3 flex-column align-items-center justify-content-center">

            <button type="button" onClick={toggleUpVotesCommentHandler} className="d-flex align-items-center">
              <BiUpvote size={30} />
              {data.upVotesBy.length }
            </button>
            <button type="button" onClick={toggleDownVotesCommentHandler} className="d-flex align-items-center">
              <BiDownvote size={30} />
              {data.downVotesBy.length }
            </button>
          </div>

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
      <Card.Footer />
    </Card>

  );
}
CommentsItem.propTypes = {
  data: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentsItem;
