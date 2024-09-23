import { setToken } from '../axios';
import { PURGE } from 'redux-persist';

var initialState = {
  isPaymentsProfileModal: false,
  isPaymentMethodModal: false,
  isAddCardModal: false,
  isChangePaymentModal: false,
  isLoading: false,
  paymentProfiles: [],
  userCards: null,
};

const Payments = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== PAYMENT DETAILS REDUCERS ============= */

    case 'TOGGLE_PAYMENTS_PROFILE_MODAL':
      return {
        ...state,
        isPaymentsProfileModal: payload
      };

    case 'TOGGLE_PAYMENT_METHOD_MODAL':
      return {
        ...state,
        isPaymentMethodModal: payload
      };

    case 'TOGGLE_ADD_CARD_MODAL':
      return {
        ...state,
        isAddCardModal: payload
      };

    case 'TOGGLE_CHANGE_PAYMENT_MODAL':
      return {
        ...state,
        isChangePaymentModal: payload
      };

    case 'IS_LOADING':
      return {
        ...state,
        isLoading: payload
      };

    case 'SET_PAYMENT_PROFILES':
      return {
        ...state,
        paymentProfiles: payload.data,
      };

    case 'ADD_PAYMENT_PROFILE':
      return {
        ...state,
        paymentProfiles: [...state.paymentProfiles, payload.data]
      };

    case 'UPDATE_PAYMENT_PROFILES':
      return {
        ...state,
        paymentProfiles: state.paymentProfiles.map(el => {
          if (el.id === payload.id) return payload;
          else return el;
        })
      };

    case 'UPDATE_DELETED_PAYMENT_PROFILE':
      return {
        ...state,
        paymentProfiles: state.paymentProfiles.filter(el => el.id !== payload)
      };

    case 'SET_USER_CARDS':
      return {
        ...state,
        userCards: payload.data,
      };

    case 'UPDATE_USER_CARDS':
      return {
        ...state,
        userCards: [...state.userCards, payload.data]
      };

    default:
      return state;
  }
};

export default Payments;
