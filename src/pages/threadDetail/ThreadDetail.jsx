import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetAllPost, asyncGetThreadDetailThunk } from '../../states/features/threads/threadSlice';
import ThreadItem from '../../components/threadItem/ThreadItem.component';

function ThreadDetail() {
  useRedirectLoggedOut('/login');
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const {
    thread, isLoading, isError, threads,
  } = useSelector((state) => state.threads);

  useEffect(() => {
    const getThreadDetail = async () => {
      await dispatch(asyncGetThreadDetailThunk(threadId));
    };

    const getAllPostAndRetrieveThreadDetail = async () => {
      await dispatch(asyncGetAllPost());
      getThreadDetail();
    };

    if (threads.length === 0) {
      getAllPostAndRetrieveThreadDetail();
    } else if (threadId) {
      const threadExists = threads.some((threadItem) => threadItem.id === threadId);
      if (threadExists) {
        getThreadDetail();
      }
    }
  }, [dispatch, threadId, threads]);

  const memoizedThread = useMemo(() => thread, [thread]);
  const memoizedIsLoading = useMemo(() => isLoading, [isLoading]);

  if (isError) {
    return <p>Thread not found</p>;
  }

  if (!memoizedIsLoading && memoizedThread) {
    return (

      <Col md={6} className="mx-auto d-flex flex-column gap-3">
        <ThreadItem data={memoizedThread} />
        <Link to="/threads" className="text-light align-self-end">Back to homepage</Link>
      </Col>

    );
  }
}

export default ThreadDetail;
