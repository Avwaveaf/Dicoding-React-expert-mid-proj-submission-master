import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from '../threadItem/ThreadItem.component';

function ThreadList({ threads = [] }) {
  return (
    <div className="container-md d-flex flex-column gap-5">
      {
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            data={{ ...thread, comments: thread.comments ? thread.comments : [] }}
          />
        ))
           }
    </div>
  );
}
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThreadList;
