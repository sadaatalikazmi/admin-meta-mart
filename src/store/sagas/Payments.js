import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { updateBannerPayment } from '../actions/Banner'
import {
  setPaymentProfiles,
  addPaymentProfile,
  updatePaymentProfiles,
  updateDeletedPaymentProfile,
  setUserCards,
  updateUserCards,
  togglePaymentsProfileModal,
  toggleAddCardModal,
  togglePaymentMethodModal,
  setIsLoading,
} from '../actions/Payments';


/*========== PAYMENT DETAILS FUNCTIONS =============*/

function* createPaymentProfile({ payload }) {
  const { error, response } = yield call(postCall, { path: '/payment/createPaymentProfile', payload: payload['paymentProfile'] });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(setIsLoading(false));
    yield put(togglePaymentsProfileModal(false));
    yield put(addPaymentProfile({ data: response['data']['body'] }));
    EventBus.publish('success', response['data']['message']);
  }
};

function* updatePaymentProfile({ payload }) {
  const { error, response } = yield call(putCall, { path: '/payment/updatePaymentProfile', payload: payload['paymentProfile'] });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(setIsLoading(false));
    yield put(togglePaymentsProfileModal(false));
    yield put(updatePaymentProfiles(response['data']['body']));
    EventBus.publish('success', response['data']['message']);
  }
};

function* deletePaymentProfile({ payload }) {
  const { error, response } = yield call(deleteCall, `/payment/deletePaymentProfile/${payload}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(updateDeletedPaymentProfile(payload));
    EventBus.publish('success', response['data']['message']);
  }
}

function* getPaymentProfiles() {
  const { error, response } = yield call(getCall, '/payment/getPaymentProfiles');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put(setPaymentProfiles({ data: response['data']['body'] }));
};

function* saveCard({ payload }) {
  const { error, response } = yield call(postCall, { path: '/payment/saveCard', payload });
  if (error) EventBus.publish('error-login', error['response'] && error['response']['data']['message']);
  else if (response) {
    yield put(updateUserCards({ data: response['data']['body'] }));
    yield put(toggleAddCardModal(false));
    EventBus.publish('success', response['data']['message']);
  }
};

function* getUserCards() {
  const { error, response } = yield call(getCall, '/payment/getUserCards');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put(setUserCards({ data: response['data']['body'] }));
};

function* paymentPay({ payload, redirection }) {
  const { isRedirect, history, bannerId } = redirection;
  const { error, response } = yield call(postCall, { path: '/payment/pay', payload });
  if (error) EventBus.publish('error-login', error['response'] && error['response']['data']['message']);
  else if (response) {
    yield put(updateBannerPayment({ campaignId: bannerId, transactionId: response['data']['body']['id'] }));
    yield put(toggleAddCardModal(false));
    yield put(togglePaymentMethodModal(false));
    EventBus.publish('success', response['data']['message']);
    if (isRedirect) setTimeout(() => history.push(`/advertiser/myBanners/${bannerId}`), 1000);
  }
};

function* paymentRefund({ payload, redirection }) {
  const { isRedirect, history, bannerId } = redirection;
  const { error, response } = yield call(postCall, { path: '/payment/refund', payload });
  if (error) EventBus.publish('error-login', error['response'] && error['response']['data']['message']);
  else if (response) {
    yield put(updateBannerPayment({ campaignId: bannerId, transactionId: response['data']['body']['id'] }));
    yield put(toggleAddCardModal(false));
    yield put(togglePaymentMethodModal(false));
    EventBus.publish('success', response['data']['message']);
    if (isRedirect) setTimeout(() => history.push(`/advertiser/myBanners/${bannerId}`), 1000);
  }
};


function* actionWatcher() {
  yield takeEvery('CREATE_PAYMENT_PROFILE', createPaymentProfile);
  yield takeEvery('UPDATE_PAYMENT_PROFILE', updatePaymentProfile);
  yield takeEvery('DELETE_PAYMENT_PROFILE', deletePaymentProfile);
  yield takeEvery('GET_PAYMENT_PROFILES', getPaymentProfiles);
  yield takeEvery('SAVE_CARD', saveCard);
  yield takeEvery('GET_USER_CARDS', getUserCards);
  yield takeEvery('PAYMENT_PAY', paymentPay);
  yield takeEvery('PAYMENT_REFUND', paymentRefund);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

function postCall({ path, payload }) {
  return axios
    .post(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response && error.response.status === 401) EventBus.publish('tokenExpired');
      return { error };
    });
}

function getCall(path) {
  return axios
    .get(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish('tokenExpired');
      return { error };
    });
}

function deleteCall(path) {
  return axios
    .delete(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish('tokenExpired');
      return { error };
    });
}

function putCall({ path, payload }) {
  return axios
    .put(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish('tokenExpired');
      return { error };
    });
}
