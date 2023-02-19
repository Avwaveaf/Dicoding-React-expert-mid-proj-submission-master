import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toast } from 'react-hot-toast';
import { GetOwnProfileHandler, LoginUserHandler, RegisterUserHandler } from '../../../services/auth';
import reducer, {
  asyncGetOwnProfileThunk,
  asyncLoginUserThunk,
  asyncRegisterUserThunk,
  initialState,
  SET_LOGIN,
  SET_LOGOUT_USER,
} from './userSlice';

jest.mock('../../../services/auth.js');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authSlice reducer', () => {
  it('should handle SET_LOGIN and isLoggedIn should same as payload', () => {
    const loginPayload = true;
    const action = { type: SET_LOGIN.type, payload: loginPayload };
    const state = reducer(initialState, action);
    expect(state.isLoggedIn).toEqual(loginPayload);
  });

  it('should handle SET_LOGOUT_USER and should set isLoggedIn to false and user to null', () => {
    const userPayload = null;
    const action = { type: SET_LOGOUT_USER.type };
    const state = reducer(initialState, action);
    expect(state.isLoggedIn).toEqual(false);
    expect(state.user).toEqual(userPayload);
  });
});

describe('userSlice thunk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle asyncGetOwnProfileThunk fulfilled', async () => {
    const store = mockStore(initialState);
    const mockData = { id: 1, username: 'testuser' };
    GetOwnProfileHandler.mockResolvedValueOnce(mockData);

    await store.dispatch(asyncGetOwnProfileThunk());

    const actions = store.getActions();

    expect(GetOwnProfileHandler).toHaveBeenCalledTimes(1);
    expect(actions[0].type).toEqual(asyncGetOwnProfileThunk.pending.type);
    expect(actions[1].type).toEqual(
      asyncGetOwnProfileThunk.fulfilled.type,
    );
    expect(actions[1].payload).toEqual(mockData);
  });

  test('should handle asyncGetOwnProfileThunk rejected', async () => {
    const store = mockStore(initialState);
    const error = new Error('Rejected');
    error.response = { data: { message: 'Failed to retrieve user' } };

    GetOwnProfileHandler.mockRejectedValueOnce(error);

    await store.dispatch(asyncGetOwnProfileThunk());

    const actions = store.getActions();
    const expectedPayload = error.response.data.message || error.message;
    expect(GetOwnProfileHandler).toHaveBeenCalledTimes(1);
    expect(actions[0].type).toEqual(asyncGetOwnProfileThunk.pending.type);
    expect(actions[1].type).toEqual(asyncGetOwnProfileThunk.rejected.type);
    expect(actions[1].payload).toEqual(expectedPayload);
  });

  test('should handle asyncRegisterUserThunk fulfilled and api calls should have proper formData', async () => {
    const store = mockStore(initialState);
    const mockData = { message: 'Registration successful' };
    RegisterUserHandler.mockResolvedValueOnce(mockData);
    const formData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };
    await store.dispatch(asyncRegisterUserThunk(formData));

    const actions = store.getActions();

    expect(RegisterUserHandler).toHaveBeenCalledTimes(1);
    expect(RegisterUserHandler).toHaveBeenLastCalledWith(formData);
    expect(actions[0].type).toEqual(asyncRegisterUserThunk.pending.type);
    expect(actions[1].type).toEqual(
      asyncRegisterUserThunk.fulfilled.type,
    );
    expect(actions[1].payload).toEqual(mockData);
  });
  test('should handle asyncRegisterUserThunk rejected and show the toast', async () => {
    const store = mockStore(initialState);
    const error = new Error('Registration failed');
    const toastSpy = jest.spyOn(toast, 'error');
    error.response = { data: { message: 'Failed to register user' } };
    const formData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };
    RegisterUserHandler.mockRejectedValueOnce(error);

    await store.dispatch(asyncRegisterUserThunk(formData));
    const actions = store.getActions();
    const expectedPayload = error.response.data.message || error.message;

    expect(RegisterUserHandler).toHaveBeenCalledTimes(1);
    expect(actions[0].type).toEqual(asyncRegisterUserThunk.pending.type);
    expect(actions[1].type).toEqual(asyncRegisterUserThunk.rejected.type);
    expect(actions[1].payload).toEqual(expectedPayload);
    expect(toastSpy).toHaveBeenCalledWith(expectedPayload);
  });

  test('should handle asyncLoginUserThunk fulfilled and api calls should have proper formData', async () => {
    const store = mockStore(initialState);
    const mockData = {
      message: 'Login successful',
      data: { token: 'testtoken' },
    };
    LoginUserHandler.mockResolvedValueOnce(mockData);
    const formData = {
      email: 'testuser@example.com',
      password: 'testpassword',
    };
    await store.dispatch(asyncLoginUserThunk(formData));

    const actions = store.getActions();

    expect(LoginUserHandler).toHaveBeenCalledTimes(1);
    expect(LoginUserHandler).toHaveBeenLastCalledWith(formData);
    expect(actions[0].type).toEqual(asyncLoginUserThunk.pending.type);
    expect(actions[1].type).toEqual(
      asyncLoginUserThunk.fulfilled.type,
    );
    expect(actions[1].payload).toEqual(mockData);
  });
  test('should handle asyncLoginUserThunk rejected and show the toast', async () => {
    const store = mockStore(initialState);
    const error = new Error('Login failed');
    const toastSpy = jest.spyOn(toast, 'error');
    error.response = { data: { message: 'Failed to Login user' } };
    const formData = {
      username: 'testuser',
      email: 'testuser@example.com',
    };
    LoginUserHandler.mockRejectedValueOnce(error);

    await store.dispatch(asyncLoginUserThunk(formData));
    const actions = store.getActions();
    const expectedPayload = error.response.data.message || error.message;

    expect(LoginUserHandler).toHaveBeenCalledTimes(1);
    expect(actions[0].type).toEqual(asyncLoginUserThunk.pending.type);
    expect(actions[1].type).toEqual(asyncLoginUserThunk.rejected.type);
    expect(actions[1].payload).toEqual(expectedPayload);
    expect(toastSpy).toHaveBeenCalledWith(expectedPayload);
  });
});
