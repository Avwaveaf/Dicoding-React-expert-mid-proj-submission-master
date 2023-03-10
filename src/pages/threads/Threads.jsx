import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateThreadModal from '../../components/createThreadModal/CreateThreadModal.component';
import LeaderboardsList from '../../components/leaderboardsList/LeaderboardsList.component';
import ThreadList from '../../components/ThreadList/ThreadList.component';
import useRedirectLoggedOut from '../../customHooks/useRedirectLoggedOut';
import { asyncGetLeaderboardsDataThunk } from '../../states/features/leaderboards/leaderboardSlice';
import { asyncGetAllPost } from '../../states/features/threads/threadSlice';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton.component';

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
    if (threads.length === 0) {
      getAllPost();
    }
  }, []);
  useEffect(() => {
    const getLeaderBoards = async () => {
      await dispatch(asyncGetLeaderboardsDataThunk());
    };
    if (leaderboards.length === 0) {
      getLeaderBoards();
    }
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
    <Row className="container-md gap-3 d-flex flex-column flex-md-row ">
      <ScrollToTopButton />
      <Col>
        <LeaderboardsList leaderboards={leaderboards} />
      </Col>

      <Col md={6}>
        <ThreadList threads={filteredThreads} />
        {
        isLoggedIn && <CreateThreadModal />
      }

      </Col>
      <Col className="d-flex flex-column gap-1">
        <p className="fs-4 p-0 m-0 text-light align-self-center">Featured Categories</p>
        <Card className="p-3" style={{ height: 'auto' }}>
          <div data-testid="featured-categories">
            {categories?.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                style={{
                  background: selectedCategory === category ? 'rgb(33,37,41)' : 'hsla(0, 0%, 100%, 0.4)',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '15px',
                  padding: '10px',
                  margin: '5px',
                }}
              >
                {category}
              </button>
            )) }
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Threads;
