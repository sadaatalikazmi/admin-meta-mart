/*========== ADD SHELF ============= */

export const addShelf = data => ({
  type: 'ADD_SHELF',
  payload: data
});

/*========== GET ALL SHELVES ============= */

export const getAllShelves = () => ({
  type: 'GET_ALL_SHELVES'
});
export const getAllShelvesPending = () => ({
  type: 'GET_ALL_SHELVES_PENDING'
});

export const setAllShelves = data => ({
  type: 'SET_ALL_SHELVES',
  payload: data
});

export const getRackShelves = data => ({
  type: 'GET_RACK_SHELVES',
  payload: data
});

export const setRackShelves = data => ({
  type: 'SET_RACK_SHELVES',
  payload: data
});

/*========== UPDATE SHELVES ============= */

export const updateShelf = data => ({
  type: 'UPDATE_SHELF',
  payload: data
});

/*========== DELETE SHELF ============= */

export const deleteShelf = data => ({
  type: 'DELETE_SHELF',
  payload: data
});

/*========== SHELF MODAL TOGGLE ============= */

export const shelfModalToggle = data => ({
  type: 'SHELF_MODAL_TOGGLE',
  payload: data
});
