import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import CommentsItem from '../commentsItem/CommentsItem.component';

function CommentsList({ comments = [] }) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          { `Comments (${comments.length})`}
        </Accordion.Header>
        <Accordion.Body>
          {comments.length
            ? comments.map((comment) => <CommentsItem data={comment} key={comment.id} />)
            : <p>No comment</p>}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
