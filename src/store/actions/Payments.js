/*==========PAYMENT DETAILS ACTIONS ============= */

export const togglePaymentsProfileModal = (data) => ({
  type: 'TOGGLE_PAYMENTS_PROFILE_MODAL',
  payload: data
});

export const togglePaymentMethodModal = (data) => ({
  type: 'TOGGLE_PAYMENT_METHOD_MODAL',
  payload: data
});

export const toggleAddCardModal = (data) => ({
  type: 'TOGGLE_ADD_CARD_MODAL',
  payload: data
});

export const toggleChangePaymentModal = (data) => ({
  type: 'TOGGLE_CHANGE_PAYMENT_MODAL',
  payload: data
});

export const setIsLoading = (data) => ({
  type: 'IS_LOADING',
  payload: data
});

export const createPaymentProfile = (data) => ({
  type: 'CREATE_PAYMENT_PROFILE',
  payload: data
});

export const addPaymentProfile = (data) => ({
  type: 'ADD_PAYMENT_PROFILE',
  payload: data
});

export const updatePaymentProfile = (data) => ({
  type: 'UPDATE_PAYMENT_PROFILE',
  payload: data
});

export const updatePaymentProfiles = (data) => ({
  type: 'UPDATE_PAYMENT_PROFILES',
  payload: data
});

export const deletePaymentProfile = (data) => ({
  type: 'DELETE_PAYMENT_PROFILE',
  payload: data
});

export const updateDeletedPaymentProfile = (data) => ({
  type: 'UPDATE_DELETED_PAYMENT_PROFILE',
  payload: data
});

export const getPaymentProfiles = () => ({
  type: 'GET_PAYMENT_PROFILES',
});

export const setPaymentProfiles = (data) => ({
  type: 'SET_PAYMENT_PROFILES',
  payload: data
});

export const saveCard = (data) => ({
  type: 'SAVE_CARD',
  payload: data
});

export const getUserCards = () => ({
  type: 'GET_USER_CARDS',
});

export const setUserCards = (data) => ({
  type: 'SET_USER_CARDS',
  payload: data
});

export const updateUserCards = (data) => ({
  type: 'UPDATE_USER_CARDS',
  payload: data
});

export const paymentPay = ({ data, redirection }) => ({
  type: 'PAYMENT_PAY',
  payload: data,
  redirection,
});

export const paymentRefund = ({ data, redirection }) => ({
  type: 'PAYMENT_REFUND',
  payload: data,
  redirection,
});