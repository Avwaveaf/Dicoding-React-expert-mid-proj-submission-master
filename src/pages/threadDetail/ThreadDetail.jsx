import DOMPurify from 'dompurify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetThreadDetailThunk } from '../../states/features/threads/threadSlice';
import formatDate from '../../services/formatDate';

function ThreadDetail() {
  useRedirectLoggedOut('/login');
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { thread, isLoading } = useSelector((state) => state.threads);

  useEffect(() => {
    const getThreadDetail = async () => {
      await dispatch(asyncGetThreadDetailThunk(threadId));
    };
    getThreadDetail();
  }, [dispatch, threadId]);
  if (isLoading || !thread) {
    return <p>Loading...</p>;
  }
  if (!isLoading && thread) {
    return (
      <div className="container-md flex justify-content-center align-items-center">
        <h1>{thread.title }</h1>
        <h4>{ thread.category}</h4>
        <span>
          created By:
          {' '}
          {thread.owner.name }
        </span>
        <span>
          created at:
          {' '}
          { formatDate(thread.createdAt)}
        </span>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(thread.body),
          }}
        />
        <div />
        <hr />
        <div className="container-sm">
          {thread.comments.length !== 0 ? thread.comments.map((item) => {
            const {
              id, content, createdAt, owner, upVotesBy, downVotesBy,
            } = item;

            return (
              <div key={id}>
                <p>{content}</p>
                <span>
                  created by:
                  {' '}
                  {owner.name }
                </span>
                <span>{formatDate(createdAt) }</span>
              </div>
            );
          })
            : <p>No comments</p> }

        </div>
      </div>
    );
  }
}

export default ThreadDetail;
