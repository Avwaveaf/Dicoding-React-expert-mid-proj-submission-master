import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateThreadModal from '../../components/createThreadModal/CreateThreadModal.component';
import CustomNavbar from '../../components/customNavbar/CustomNavbar.component';
import LeaderboardsList from '../../components/leaderboardsList/LeaderboardsList.component';
import ThreadList from '../../components/ThreadList/ThreadList.component';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetLeaderboardsDataThunk } from '../../states/features/leaderboards/leaderboardSlice';
import { asyncGetAllPost } from '../../states/features/threads/threadSlice';

function Threads() {
  useRedirectLoggedOut('/login');
  const { isLoading, threads } = useSelector((state) => state.threads);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { leaderboards } = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPost = async () => {
      await dispatch(asyncGetAllPost());
    };
    getAllPost();
  }, []);
  useEffect(() => {
    const getLeaderBoards = async () => {
      await dispatch(asyncGetLeaderboardsDataThunk());
    };
    getLeaderBoards();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <CustomNavbar />
      <div className="container-md py-5 mt-5 d-lg-flex ">
        <div>
          <ThreadList threads={threads} />
          {
        isLoggedIn && <CreateThreadModal />
      }

        </div>

        <LeaderboardsList leaderboards={leaderboards} />
      </div>
    </>
  );
}

export default Threads;
