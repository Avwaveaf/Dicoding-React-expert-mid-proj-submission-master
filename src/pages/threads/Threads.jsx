import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';
import CreateThreadModal from '../../components/createThreadModal/CreateThreadModal.component';
import LeaderboardsList from '../../components/leaderboardsList/LeaderboardsList.component';
import ThreadList from '../../components/ThreadList/ThreadList.component';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetLeaderboardsDataThunk } from '../../states/features/leaderboards/leaderboardSlice';
import { asyncGetAllPost } from '../../states/features/threads/threadSlice';

function Threads() {
  useRedirectLoggedOut('/login');
  const { threads } = useSelector((state) => state.threads);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { leaderboards } = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  // State to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const categories = useMemo(() => {
    const newCategories = threads.reduce((arr, thread) => {
      if (!arr.includes(thread.category)) {
        arr.push(thread.category);
      }
      return arr;
    }, []);
    return newCategories;
  }, [threads]);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevSelectedCategory) => {
      // If the clicked category is the same as the current selected category, toggle off the filter
      if (prevSelectedCategory === category) {
        return null;
      }
      // Otherwise, select the clicked category
      return category;
    });
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <>

      <div className="px-5 border rounded h-100 ">
        <h1>Categories</h1>

        {categories?.map((category) => (

          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            style={{
              background: selectedCategory === category ? 'rgb(33,37,41)' : 'white',
              color: selectedCategory === category ? 'white' : 'black',
              border: '1px solid black',
              borderRadius: '5px',
              padding: '10px',
              margin: '5px',
            }}
          >
            {category}
          </button>

        )) }

      </div>
      <div className="container-md   d-lg-flex ">

        <div>
          <ThreadList threads={filteredThreads} />
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
