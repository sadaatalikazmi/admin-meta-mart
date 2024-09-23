/*========== PAGE LOADER ACTIONS ============= */

export const setLoader = data => ({
  type: 'SET_LOADER',
  payload: data
});



/*========== REGISTER ACTIONS ============= */

export const register = ({ data, history }) => ({
  type: 'REGISTER',
  payload: data,
  history
});

export const registerLoader = data => ({
  type: 'REGISTER_LOADER',
  payload: data
});



/*========== LOGIN ACTIONS ============= */

export const login = ({ data, history }) => ({
  type: 'LOGIN',
  payload: data,
  history
});

export const loginLoader = data => ({
  type: 'LOGIN_LOADER',
  payload: data
});

export const setLoginData = data => ({
  type: 'SET_LOGIN_DATA',
  payload: data
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setAddress = data => ({
  type: 'SET_ADDRESS',
  payload: data
});



/*========== MODAL ACTIONS ============= */

export const toggleModal = data => ({
  type: 'TOGGLE_REFRESH_MODAL',
  payload: data
});
