import { PURGE } from 'redux-persist';

let initialState = {
  fetching: true,
  allShelves: [],
  rackShelves: [],
  isShelfModal: false
};

const Shelf = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== SHELF REDUCERS ============= */
      
    case 'SET_ALL_SHELVES':
      return {
        ...state,
        fetching: false,
        allShelves: payload.data,
        count: payload.count
      };

    case 'SET_RACK_SHELVES':
      return {
        ...state,
        rackShelves: payload
      };

    case 'GET_ALL_SHELVES_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'DELETE_SHELF_TOGGLE':
      return {
        ...state,
        isShelfModal: payload
      };
      
    default:
      return state;
  }
};

export default Shelf;
