import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import CommentsItem from '../commentsItem/CommentsItem.component';

function CommentsList({ comments, threadId }) {
  return (
    <Accordion id="comments-accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          { `Comments (${comments.length})`}
        </Accordion.Header>
        <Accordion.Body>
          {comments.length
            ? comments.map((comment) => (
              <CommentsItem
                data={comment}
                threadId={threadId}
                key={comment.id}
              />
            ))
            : <p>No comment</p>}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
CommentsList.defaultProps = {
  comments: [],
};
CommentsList.propTypes = {
  comments: PropTypes.array,
  threadId: PropTypes.string.isRequired,

};

export default CommentsList;
