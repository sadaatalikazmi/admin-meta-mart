import { PURGE } from 'redux-persist';

let initialState = {
  fetching: true,
  allUsers: [],
  customersGraph: null,
  vendor: null,
  dataProtectionContact: null
};

const User = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== USER REDUCERS ============= */

    case 'SET_ALL_USERS':
      return {
        ...state,
        allUsers: payload.data,
        fetching: false,
        count: payload.count
      };

    case 'SET_CUSTOMERS_GRAPH':
      return {
        ...state,
        customersGraph: {
          ...payload
        }
      };

    case 'GET_ALL_USERS_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'UPDATE_USER_DETAILS':
      return {
        ...state,
        allUsers: state.allUsers.map(
          el => el._id === payload._id ? payload : el
        )
      };

    case 'SET_VENDOR':
      return {
        ...state,
        vendor: payload?.data
      }

    case 'SET_DATA_PROTECTION_CONTACT':
      return {
        ...state,
        dataProtectionContact: payload?.data
      }

    default:
      return state;
  }
};

export default User;
