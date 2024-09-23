/*========== ADD SLOT ============= */

export const addSlot = ({ formData }) => ({
  type: 'ADD_SLOT',
  payload: formData
});

/*========== GET ALL SLOTS ============= */

export const getAllSlots = data => ({
  type: 'GET_ALL_SLOTS',
  payload: data
});

export const getAllSlotsPending = () => ({
  type: 'GET_ALL_SLOTS_PENDING'
});

export const setAllSlots = data => ({
  type: 'SET_ALL_SLOTS',
  payload: data
});
export const getShelfSlot = data => ({
  type: 'GET_SHELF_SLOT',
  payload: data
});

export const setShelfSlot = data => ({
  type: 'SET_SHELF_SLOT',
  payload: data
});

/*========== PLACE PRODUCT ============= */

export const setPlaceProduct = data => ({
  type: 'SET_PLACE_PRODUCT',
  payload: data
});

export const setPlaceManyProducts = data => ({
  type: 'SET-PLACE-MANY-PRODUCTS',
  payload: data
});

/*========== UPDATE SLOT ============= */

export const updateSlot = data => ({
  type: 'UPDATE_SLOT',
  payload: data
});

/*========== DELETE SLOT ============= */

export const deleteSlot = data => ({
  type: 'DELETE_SLOT',
  payload: data
});
