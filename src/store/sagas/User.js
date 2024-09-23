import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put, cancel } from 'redux-saga/effects';

import { setAllUsers, setDataProtectionContact, setVendor } from '../actions/User';


/*========== ADD USER FUNCTION =============*/

function* getCustomersGraph() {
  const { error, response } = yield call(getCall, '/user/newcustomers-graph');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(
      { type: 'SET_CUSTOMERS_GRAPH', payload: response['data']['body'] }
    );
  }
}

function* addUser({ payload }) {
  const { formData, successCallback, failCallBack } = payload;
  const { error, response } = yield call(postCall, {
    path: '/user/signup',
    payload: formData
  });
  if (error) {
    EventBus.publish('error', error['response']['data']['message']);
    failCallBack();
  } else {
    successCallback();
    yield put({ type: 'GET_ALL_USERS' });
    EventBus.publish('success', response['data']['message']);

  }
}

/*========== UPDATE USER FUNCTION =============*/

function* updateUser({ payload }) {
  const { formData, successCallback, failCallBack } = payload;
  const { error, response } = yield call(patchCall, {
    path: `/user/updateUser/${formData._id}`,
    payload: formData
  });
  if (error) {
    EventBus.publish('error', error['response']['data']['message']);
    failCallBack();
  } else {
    successCallback();
    yield put({ type: 'UPDATE_USER_DETAILS', payload: response['data']['body'] });

    EventBus.publish('success', response['data']['message']);
  }
}

/********************* GET ALL USERS **********************/

function* getAllUsers() {
  yield put({ type: 'GET_ALL_USERS_PENDING' });
  const { error, response } = yield call(getCall, '/user/getAllUsers');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(
      setAllUsers({
        data: response['data']['body'],
        count: response['data']['count']
      })
    );
  }
}

/*========== GET VENDER =============*/

function* getVendor() {
  const { error, response } = yield call(getCall, '/user/getVendor');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(
      setVendor({
        data: response['data']['body']['vendor']
      })
    );
  }
}

/*========== UPDATE VENDER =============*/

function* updateVender({ payload }) {
  const { error, response } = yield call(putCall, { path: '/user/updateVendor', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else EventBus.publish('success', response['data']['message']);
}

/*========== CANCEL ACCOUNT =============*/

function* cancelAccount() {
  const { error, response } = yield call(patchCall, { path: '/user/cancelAccount' });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else yield put({ type: 'LOGOUT' });
}


/*========== DATA PROTECTION CONTACT =============*/

function* getDataProtectionContact() {
  const { error, response } = yield call(getCall, '/banner/getDataProtectionContact');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put(setDataProtectionContact({ data: response['data']['body'] }));
}

function* saveDataProtectionContact({ payload }) {
  const { error, response } = yield call(postCall, { path: '/banner/saveDataProtectionContact', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else EventBus.publish('success', response['data']['message']);
}

function* saveTradeLicense({ payload: props }) {
  const { formData: payload, successCallback, failCallBack } = props;
  const { error, response } = yield call(postCall, { path: '/banner/saveTradeLicense', payload });
  if (error) {
    failCallBack();
    EventBus.publish('error', error['response']['data']['message']);
  } else {
    successCallback(response['data']['body']);
    EventBus.publish('success', response['data']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('ADD_USER', addUser);
  yield takeEvery('GET_ALL_USERS', getAllUsers);
  yield takeEvery('UPDATE_USER', updateUser);
  yield takeEvery('GET_CUSTOMERS_GRAPH', getCustomersGraph);
  yield takeEvery('GET_VENDOR', getVendor);
  yield takeEvery('UPDATE_VENDOR', updateVender);
  yield takeEvery('CANCEL_ACCOUNT', cancelAccount);
  yield takeEvery('GET_DATA_PROTECTION_CONTACT', getDataProtectionContact);
  yield takeEvery('SAVE_DATA_PROTECTION_CONTACT', saveDataProtectionContact);
  yield takeEvery('SAVE_TRADE_LICENSE', saveTradeLicense);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

function postCall({ path, payload }) {
  return axios
    .post(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish('tokenExpired');
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

function patchCall({ path, payload }) {
  return axios
    .patch(path, payload)
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
