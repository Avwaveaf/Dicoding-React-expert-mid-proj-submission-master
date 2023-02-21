import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toast } from 'react-hot-toast';
import {
  asyncGetLeaderboardsDataThunk,
} from './leaderboardSlice';
import { GetLeaderboardsData } from '../../../services/leaderboards';

jest.mock('../../../services/leaderboards');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * getLeaderboards thunk
1.  ensures that the "asyncGetLeaderboardsDataThunk" function dispatches the expected actions
    and payload when the asynchronous request is successful.
2. ensures that the "asyncGetLeaderboardsDataThunk" function dispatches the expected actions
     and payload when the asynchronous request is rejected.
 */

describe('leaderboardSlice thunk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle asyncGetLeaderboardsDataThunk fulfilled', async () => {
    const store = mockStore({
      leaderboards: [],
      isLoading: false,
      message: '',
    });
    const leaderboardsData = {
      data: {
        leaderboards: [
          { id: 1, name: 'Leaderboard 1' },
          { id: 2, name: 'Leaderboard 2' },
        ],
        message: 'Leaderboards retrieved successfully',
      },
    };
    GetLeaderboardsData.mockResolvedValueOnce(leaderboardsData);

    await store.dispatch(asyncGetLeaderboardsDataThunk());

    const actions = store.getActions();

    const expectedPayload = {
      data: {
        leaderboards: leaderboardsData.data.leaderboards,
        message: leaderboardsData.data.message,
      },
    };

    expect(actions[0].type).toEqual(asyncGetLeaderboardsDataThunk.pending.type);
    expect(actions[1].type).toEqual(
      asyncGetLeaderboardsDataThunk.fulfilled.type,
    );
    expect(actions[1].payload).toEqual(expectedPayload);
  });

  test('should handle asyncGetLeaderboardsDataThunk rejected', async () => {
    const store = mockStore({
      leaderboards: [],
      isLoading: false,
      message: '',
    });
    const error = new Error('Unable to retrieve leaderboards');
    error.response = { data: { message: 'Failed to retrieve leaderboards' } };
    GetLeaderboardsData.mockRejectedValueOnce(error);
    const toastSpy = jest.spyOn(toast, 'error');

    await store.dispatch(asyncGetLeaderboardsDataThunk());
    const actions = store.getActions();
    const expectedPayload = error.response.data.message || error.message;
    expect(actions[0].type).toEqual(asyncGetLeaderboardsDataThunk.pending.type);
    expect(actions[1].type).toEqual(
      asyncGetLeaderboardsDataThunk.rejected.type,
    );
    expect(actions[1].payload).toEqual(expectedPayload);
    expect(toastSpy).toHaveBeenCalledWith(expectedPayload);
  });
});
