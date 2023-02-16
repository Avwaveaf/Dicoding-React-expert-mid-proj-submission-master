import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';

function LeaderboardsList({ leaderboards }) {
  return (

    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Leaderboards</Accordion.Header>
        <Accordion.Body>
          {
              leaderboards.map((item) => (
                <div className="d-flex justify-content-between  p-2" key={item.user.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={item.user.avatar} width={25} height={25} className="rounded-circle" alt="user" />
                    <p className="my-auto ms-2">{item.user.name }</p>
                  </div>
                  {item.score }
                </div>
              ))
            }
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>

  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardsList;
