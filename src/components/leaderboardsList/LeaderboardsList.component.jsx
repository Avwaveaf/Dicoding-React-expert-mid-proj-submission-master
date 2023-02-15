import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import React from 'react';

function LeaderboardsList({ leaderboards }) {
  return (
    <Col xs={12} lg={3} className="d-flex flex-column">
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Leaderboards</Accordion.Header>
          <Accordion.Body>
            {
              leaderboards.map((item) => (
                <div className="d-flex-col justify-content-center  p-2" key={item.user.id}>
                  <div className="d-flex  align-items-center">
                    <img src={item.user.avatar} className="rounded-circle" alt="user" />
                    <p className="my-auto ms-2">{item.user.name }</p>
                  </div>
                  {item.score }
                </div>
              ))
            }
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Col>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardsList;
