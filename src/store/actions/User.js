/*========== ADD USER ============= */

export const addUser = (formData) => ({
  type: 'ADD_USER',
  payload: formData
});

/*========== UPDATE USER ============= */

export const updateUser = (formData) => ({
  type: 'UPDATE_USER',
  payload: formData
});
export const getCustomersGraph = () => ({
  type: 'GET_CUSTOMERS_GRAPH'
});
export const updateUserDetails = data => ({
  type: 'UPDATE_USER_DETAILS',
  payload: data
});

/*========== GET ALL USERS ============= */

export const getAllUsers = () => ({
  type: 'GET_ALL_USERS'
});
/*========== GET ALL USERS ============= */

export const getAllUsersPending = () => ({
  type: 'GET_ALL_USERS_PENDING'
});

export const setAllUsers = data => ({
  type: 'SET_ALL_USERS',
  payload: data
});

/*========== GET VENDOR ============= */

export const getVendor = () => ({
  type: 'GET_VENDOR',
});

export const setVendor = data => ({
  type: 'SET_VENDOR',
  payload: data
});

export const updateVender = data => ({
  type: 'UPDATE_VENDOR',
  payload: data
});

/*========== CANCEL ACCOUNT ============= */
export const cancelAccount = () => ({
  type: 'CANCEL_ACCOUNT',
});

/*========== DATA PROTECTION CONTACT ============= */
export const getDataProtectionContact = () => ({
  type: 'GET_DATA_PROTECTION_CONTACT',
});

export const setDataProtectionContact = (data) => ({
  type: 'SET_DATA_PROTECTION_CONTACT',
  payload: data
});

export const saveDataProtectionContact = data => ({
  type: 'SAVE_DATA_PROTECTION_CONTACT',
  payload: data
});

/*========== TRADE LICENSE ============= */
export const saveTradeLicense = data => ({
  type: 'SAVE_TRADE_LICENSE',
  payload: data
});