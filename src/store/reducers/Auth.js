import { PURGE } from 'redux-persist';
import { setToken } from '../axios';

let token;
try {
  token = JSON.parse(localStorage.getItem('token'));
} catch (e) { console.log(e) }

var initialState = {
  auth: token,
  isLogin: false,
  isLoader: false,
  isModal: false,
  allRacks: [],
  user: null
};

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== ADMIN REDUCERS ============= */

    case 'SET_LOGIN_DATA':
      setToken(payload.token || state.auth);
      localStorage.setItem(
        'token',
        JSON.stringify(payload.token || state.auth)
      );
      return {
        ...state,
        auth: payload.token || state.auth,
        user: payload.user
      };

    case 'LOGIN_LOADER':
      return {
        ...state,
        isLogin: payload,
        isLoader: payload
      };

    case 'LOGOUT':
      window.localStorage.removeItem('token');
      return {
        ...state,
        address: '',
        auth: null
      };

    /*========== LOADER REDUCERS ============= */

    case 'SET_LOADER':
      return {
        ...state,
        isLoader: payload
      };

    case 'TOGGLE_REFRESH_MODAL':
      return {
        ...state,
        isModal: payload
      };

    default:
      return state;
  }
};

export default Auth;
