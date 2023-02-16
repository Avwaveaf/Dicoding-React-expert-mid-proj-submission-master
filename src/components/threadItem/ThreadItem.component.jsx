import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import {
  Card, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import parseHTML from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import formatDate from '../../utils/formatDate';
import CommentsList from '../commentsList/CommentsList.component';
import { asyncCreateCommentThunk } from '../../states/features/threads/threadSlice';
import { asyncToggleDownVoteThread, asyncToggleUpVoteThread } from '../../states/features/threads/toggleVotesThreadAsyncThunks';
import VotesButton from '../votesButton/VotesButton.component';
import CustomModal from '../modal/CustomModal.component';
import CommentsItem from '../commentsItem/CommentsItem.component';

const tooltip = (
  <Tooltip id="tooltip">
    <strong>press ↵ or return </strong>
    {' '}
    to post a comment.
  </Tooltip>
);
const contentTooltip = (
  <Tooltip id="tooltip">
    Click to&nbsp;
    <strong>See details</strong>
  </Tooltip>
);

function ThreadItem({ data = {} }) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    comments,
    upVotesBy,
    downVotesBy,
  } = data;
  const [comment, setComment] = useState({ content: '' });
  const [modalShow, setModalShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addCommentHandler = async () => {
    await dispatch(asyncCreateCommentThunk({ comment, id }));
    setComment({ content: '' });
  };

  const isUpVoted = useMemo(() => {
    if (user) {
      return upVotesBy.includes(user.id);
    }
    return false;
  }, [upVotesBy, user]);

  const isDownVoted = useMemo(() => {
    if (user) {
      return downVotesBy.includes(user.id);
    }
    return false;
  }, [downVotesBy, user]);

  const [voted, setVoted] = useState(() => {
    if (isUpVoted) {
      return 'up';
    }
    if (isDownVoted) {
      return 'down';
    }
    return '';
  });

  const handleUpVotesThread = async () => {
    if (voted === 'up') {
      setVoted('');
      await dispatch(asyncToggleUpVoteThread(id));
    } else {
      setVoted('up');
      await dispatch(asyncToggleUpVoteThread(id));
    }
  };
  const handleDownVotesThread = async () => {
    if (voted === 'down') {
      setVoted('');
      await dispatch(asyncToggleDownVoteThread(id));
    } else {
      setVoted('down');
      await dispatch(asyncToggleDownVoteThread(id));
    }
  };

  const truncatedBody = body.length > 200 ? `${body.slice(0, 200)}...` : body;
  return (
    <Card>
      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Row className="container-md d-flex flex-column flex-md-row">
          <Col className="p-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <img src={owner.avatar} loading="lazy" width={40} height={40} className="rounded-circle" alt="owner" />
                <span>{owner.name }</span>
              </div>
              <VotesButton
                upVotesCount={upVotesBy.length}
                downVotesCount={downVotesBy.length}
                toggleUpVoteshandler={handleUpVotesThread}
                toggleDownVotesHandler={handleDownVotesThread}
                voted={voted}
              />
            </div>
            <Card.Title>{title}</Card.Title>
            <div className="d-flex justify-content-between">
              <span className="text-muted" style={{ fontSize: '12px' }}>{formatDate(createdAt)}</span>
              <Badge bg="dark" style={{ width: 'fit-content' }}>
                #
                {category}
              </Badge>
            </div>
            <div className="p-2">
              { parseHTML(DOMPurify.sanitize(body))}
            </div>
          </Col>
          <Col className="p-3 d-flex gap-3 flex-column justify-content-between">
            <div className="d-flex flex-column gap-3">
              <Card.Title>
                {`Comments (${comments.length})` }
              </Card.Title>
              {comments.length
                ? comments.map((item) => (
                  <CommentsItem
                    data={item}
                    threadId={id}
                    key={`${item.id + new Date()}`}
                  />
                ))
                : <p>No comment</p>}
            </div>
            <InputGroup>
              <InputGroup.Text className="d-flex gap-2 px-4" id="basic-addon2">
                <img src={user?.avatar} width={25} height={25} className="rounded-circle" alt="user" />
                {user?.name }
              </InputGroup.Text>
              <OverlayTrigger placement="bottom" overlay={tooltip}>

                <Form.Control
                  placeholder="Add comment"
                  type="text"
                  name="content"
                  value={comment.content}
                  onChange={(e) => setComment({ [e.target.name]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      addCommentHandler();
                    }
                  }}
                  autoComplete="off"
                />
              </OverlayTrigger>

            </InputGroup>

          </Col>

        </Row>
      </CustomModal>

      <Card.Header>

        <div className="d-flex px-3 justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <img src={owner.avatar} loading="lazy" width={40} height={40} className="rounded-circle" alt="owner" />
            <span>{owner.name }</span>
          </div>
          <VotesButton
            upVotesCount={upVotesBy.length}
            downVotesCount={downVotesBy.length}
            toggleUpVoteshandler={handleUpVotesThread}
            toggleDownVotesHandler={handleDownVotesThread}
            voted={voted}
          />
        </div>

      </Card.Header>
      <Card.Body style={{ boxShadow: 'inset 0px -100px 100px -100px rgba(0,0,0,0.75)' }}>
        <Card.Title>{title}</Card.Title>
        <div className="d-flex p-3 justify-content-between">
          <span className="text-muted" style={{ fontSize: '12px' }}>{formatDate(createdAt)}</span>
          <Badge bg="dark" style={{ width: 'fit-content' }}>
            #
            {category}
          </Badge>
        </div>
        <OverlayTrigger placement="auto" overlay={contentTooltip}>
          { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
         jsx-a11y/no-static-element-interactions */}
          <div
            className="p-3"
            style={{
              height: '150px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => setModalShow(true)}
          >
            { parseHTML(DOMPurify.sanitize(truncatedBody))}
          </div>
        </OverlayTrigger>
        <InputGroup>
          <InputGroup.Text className="d-flex gap-2 px-4 rounded-0 text-secondary" id="basic-addon2">
            <img src={user?.avatar} width={25} height={25} className="rounded-circle" alt="user" />
            {user?.name }
          </InputGroup.Text>
          <OverlayTrigger placement="bottom" overlay={tooltip}>

            <Form.Control
              placeholder="Add comment"
              type="text"
              name="content"
              className="rounded-0"
              value={comment.content}
              onChange={(e) => setComment({ [e.target.name]: e.target.value })}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  addCommentHandler();
                }
              }}
              autoComplete="off"
            />
          </OverlayTrigger>

        </InputGroup>
        <CommentsList comments={comments} threadId={id} />
      </Card.Body>

    </Card>

  );
}
ThreadItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ThreadItem;
