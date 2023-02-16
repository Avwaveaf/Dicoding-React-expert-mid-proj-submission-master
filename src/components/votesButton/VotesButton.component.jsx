import React from 'react';
import PropTypes from 'prop-types';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';

function VotesButton({
  toggleUpVoteshandler, toggleDownVotesHandler, upVotesCount, downVotesCount, voted = null,
}) {
  return (
    <div className=" d-flex gap-2 flex-column  align-items-center justify-content-center">

      <button type="button" onClick={toggleUpVoteshandler} className="d-flex align-items-center border-0 bg-transparent rounded-circle">
        <TiArrowUpThick size={20} color={voted === 'up' ? '#00c853' : '#c9c9c9'} />
        {upVotesCount }
      </button>
      <button type="button" onClick={toggleDownVotesHandler} className="d-flex align-items-center border-0 bg-transparent rounded-circle">
        <TiArrowDownThick size={20} color={voted === 'down' ? '#DC3545' : '#c9c9c9'} />
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
