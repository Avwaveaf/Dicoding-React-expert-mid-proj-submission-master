import DOMPurify from 'dompurify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parseHTML from 'html-react-parser';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetThreadDetailThunk } from '../../states/features/threads/threadSlice';
import formatDate from '../../utils/formatDate';
import CommentsList from '../../components/commentsList/CommentsList.component';

function ThreadDetail() {
  useRedirectLoggedOut('/login');
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { thread, isLoading, isError } = useSelector((state) => state.threads);

  useEffect(() => {
    const getThreadDetail = async () => {
      await dispatch(asyncGetThreadDetailThunk(threadId));
    };
    getThreadDetail();
  }, [dispatch, threadId]);

  if (isError) {
    return <p>Thread not found</p>;
  }

  if (!isLoading && thread) {
    return (
      <div className="container-md flex justify-content-center align-items-center">
        <h1>{thread.title}</h1>
        <h4>{thread.category}</h4>
        <span>
          created By:
          {' '}
          {thread.owner.name}
        </span>
        <span>
          created at:
          {' '}
          {formatDate(thread.createdAt)}
        </span>
        <div className="p-3">
          {parseHTML(DOMPurify.sanitize(thread.body))}
        </div>
        <div />
        <hr />
        <div>
          <CommentsList comments={thread.comments} threadId={thread.id} />
        </div>

      </div>
    );
  }
}

export default ThreadDetail;
