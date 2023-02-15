import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parseHTML from 'html-react-parser';
import Card from 'react-bootstrap/Card';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import formatDate from '../../services/formatDate';

function CommentsItem({ data }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex  gap-4">
          <div className=" d-flex gap-3 flex-column align-items-center justify-content-center">

            <span className="d-flex align-items-center">
              <BiUpvote size={30} />
              {data.upVotesBy.length }
            </span>
            <span className="d-flex align-items-center">
              <BiDownvote size={30} />
              {data.downVotesBy.length }
            </span>
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
};

export default CommentsItem;
