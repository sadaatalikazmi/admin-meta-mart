import { PURGE } from 'redux-persist';

let initialState = {
  allSlots: [],
  shelfSlots: [],
  fetching: true,
  count: 0
};

const Slot = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== SLOT REDUCERS ============= */

    case 'SET_ALL_SLOTS':
      return {
        ...state,
        fetching: false,
        allSlots: payload.data,
        count: payload.count
      };

    case 'GET_ALL_SLOTS_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'SET_SHELF_SLOT':
      return {
        ...state,
        shelfSlots: payload
      };

    default:
      return state;
  }
};

export default Slot;
