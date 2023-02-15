import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

function VotesButton({
  toggleUpVoteshandler, toggleDownVotesHandler, upVotesCount, downVotesCount, voted = null,
}) {
  return (
    <div className=" d-flex gap-2 flex-column  align-items-center justify-content-center">

      <button type="button" onClick={toggleUpVoteshandler} className="d-flex align-items-center border-0 bg-transparent rounded-circle">
        <BiUpvote size={20} color={voted === 'up' && 'red'} />
        {upVotesCount }
      </button>
      <button type="button" onClick={toggleDownVotesHandler} className="d-flex align-items-center border-0 bg-transparent rounded-circle">
        <BiDownvote size={20} color={voted === 'down' && 'red'} />
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
  voted: PropTypes.string.isRequired,
};

export default VotesButton;
