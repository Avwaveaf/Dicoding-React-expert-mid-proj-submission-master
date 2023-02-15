import React from 'react';
import PropTypes from 'prop-types';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

function VotesButton({
  toggleUpVoteshandler, toggleDownVotesHandler, upVotesCount, downVotesCount,
}) {
  return (
    <div className=" d-flex gap-3 flex-column align-items-center justify-content-center">

      <button type="button" onClick={toggleUpVoteshandler} className="d-flex align-items-center">
        <BiUpvote size={30} />
        {upVotesCount }
      </button>
      <button type="button" onClick={toggleDownVotesHandler} className="d-flex align-items-center">
        <BiDownvote size={30} />
        {downVotesCount }
      </button>
    </div>
  );
}
VotesButton.propTypes = {
  toggleUpVoteshandler: PropTypes.func.isRequired,
  toggleDownVotesHandler: PropTypes.func.isRequired,
  upVotesCount: PropTypes.number.isRequired,
  downVotesCount: PropTypes.number.isRequired,
};

export default VotesButton;
