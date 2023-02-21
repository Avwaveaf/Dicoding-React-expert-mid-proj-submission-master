import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from '../threadItem/ThreadItem.component';

function ThreadList({ threads = [] }) {
  return (
    <div className="w-100 d-flex flex-column gap-5" data-testid="thread-list">
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
