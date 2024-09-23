import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { setAllSlots, setShelfSlot } from '../actions/Slot';

/*========== ADD SLOT FUNCTIONS =============*/

function* addSlot({ payload }) {
  const { error, response } = yield call(postCall, { path: '/slot/createSlot', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}
/*========== PLACE PRODUCT =============*/

function* setPlaceProduct({ payload }) {
  const { error, response } = yield call(putCall, { path: '/product/placingProduct', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}
/*========== PLACE MANY PRODUCTS =============*/

function* setPlaceManyProducts({ payload }) {

  const { data, successCallback } = payload;
  const { error, response } = yield call(putCall, { path: '/product/place-many', payload: data });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    successCallback()
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}
/*========== UPDATE SLOT FUNCTION =============*/

function* updateSlot({ payload }) {
  const { error, response } = yield call(putCall, { path: '/slot/updateSlot', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== DELETE SLOT FUNCTION =============*/

function* deleteSlot({ payload }) {
  const { error, response } = yield call(deleteCall, `/slot/deleteSlot/${payload}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/********************* GET ALL SLOTS **********************/

function* getAllSlots({ payload }) {
  yield put({ type: 'GET_ALL_SLOTS_PENDING' });
  let url = '/slot/getAllSlot';
  if (payload) {
    url += '?';
    Object.entries(payload).forEach(([key, value], idx) => {
      if (idx > 0) url += `&`;
      url += `${key}=${value}`;
    });
  }

  const { error, response } = yield call(getCall, url);
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(
      setAllSlots({
        data: response['data']['body'],
        count: response['data']['count']
      })
    );
    EventBus.publish('success', response['data']['body']['message']);
  }
}

/********************* GET ALL SLOTS **********************/

function* getShelfSlot({ payload }) {

  const { error, response } = yield call(getCall, `/slot/getShelfSlot/${payload}`);
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(setShelfSlot(response['data']['body']));
    EventBus.publish('success', response['data']['body']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('ADD_SLOT', addSlot);
  yield takeEvery('UPDATE_SLOT', updateSlot);
  yield takeEvery('GET_ALL_SLOTS', getAllSlots);
  yield takeEvery('GET_SHELF_SLOT', getShelfSlot);
  yield takeEvery('SET_PLACE_PRODUCT', setPlaceProduct);
  yield takeEvery('DELETE_SLOT', deleteSlot);
  yield takeEvery('SET-PLACE-MANY-PRODUCTS', setPlaceManyProducts);
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
