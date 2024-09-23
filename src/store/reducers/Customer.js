import { PURGE } from 'redux-persist';

let initialState = {
  allOrders: [],
  count: 0
};

const Customer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== CUSTOMER REDUCERS ============= */

    case 'SET_ALL_ORDERS':
      return {
        ...state,
        allOrders: payload.data,
        count: payload.count
      };

    default:
      return state;
  }
};

export default Customer;
