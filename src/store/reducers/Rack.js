import { PURGE } from 'redux-persist';

var initialState = {
  fetching: true,
  allRacks: [],
  categoryRacks: []
};

const Rack = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== RACK REDUCERS ============= */

    case 'SET_ALL_RACKS':
      return {
        ...state,
        allRacks: payload.data,
        fetching: false,
        count: payload.count
      };

    case 'GET_ALL_RACKS_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'SET_CATEGORY_RACKS':
      return {
        ...state,
        categoryRacks: payload
      };

    case 'TOGGLE_EDIT_RACK_MODAL':
      return {
        ...state,
        isDeleteRackModal: payload
      };

    default:
      return state;
  }
};

export default Rack;
