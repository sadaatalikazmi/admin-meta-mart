/*========== ADD RACK ============= */

export const addRack = (formData) => ({
  type: 'ADD_RACK',
  payload: formData
});

/*========== UPDATE RACK ============= */

export const updateRack = (formData) => ({
  type: 'UPDATE_RACK',
  payload: formData
});

export const placeProduct = (formData) => ({
  type: 'PLACE_RACK',
  payload: formData
});


/*========== GET ALL RACKS ============= */

export const getAllRacks = () => ({
  type: 'GET_ALL_RACKS'
});

/*========== GET ALL RACKS ============= */

export const getAllRacksPending = () => ({
  type: 'GET_ALL_RACKS_PENDING'
});

export const setAllRacks = data => ({
  type: 'SET_ALL_RACKS',
  payload: data
});

export const getCategoryRacks = data => ({
  type: 'GET_CATEGORY_RACKS',
  payload: data
});

export const setCategoryRacks = data => ({
  type: 'SET_CATEGORY_RACKS',
  payload: data
});

/*========== DELETE RACK ============= */

export const deleteRacks = data => ({
  type: 'DELETE_RACKS',
  payload: data
});

/*========== TOGGLE PRODUCT MODAL ============= */

export const toggleDeleteRackModal = data => ({
  type: 'TOGGLE_DELETE_RACK_MODAL',
  payload: data
});
