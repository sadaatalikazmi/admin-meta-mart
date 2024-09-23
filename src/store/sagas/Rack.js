import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setAllRacks, setCategoryRacks } from '../actions/Rack';

/*========== ADD RACK FUNCTIONS =============*/

function* addRack({ payload }) {
  const { formData, successCallback, failCallBack } = payload;
  const { error, response } = yield call(postCall, { path: '/rack/createRack', payload: formData });
  if (error) {
    EventBus.publish('error', error['response']['data']['message']);
    failCallBack();
  } else {
    successCallback();
    yield put({ type: 'GET_ALL_RACKS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== UPDATE RACK FUNCTIONS =============*/

function* updateRack({ payload }) {
  const { formData, successCallback, failCallBack, id } = payload;
  const { error, response } = yield call(putCall, { path: `/rack/updateRack/${id}`, payload: formData });
  if (error) {
    EventBus.publish('error', error['response']['data']['message']);
    failCallBack();
  } else {
    successCallback();
    yield put({ type: 'GET_ALL_RACKS' });
    EventBus.publish('success', response['data']['message']);
  }
}


/*========== UPDATE RACK FUNCTIONS =============*/

function* placeProduct({ payload }) {
  const { formData, successCallback, failCallBack, id } = payload;
  const { error, response } = yield call(putCall, { path: `/rack/placeProduct/${id}`, payload: formData });
  if (error) {
    EventBus.publish('error', error['response']['data']['message']);
    failCallBack();
  } else {
    successCallback();
    yield put({ type: 'GET_ALL_RACKS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/********************* GET ALL RACKS **********************/

function* getAllRacks({ payload }) {
  yield put({ type: 'GET_ALL_RACKS_PENDING' });
  let url = '/rack/getRacks';
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
      setAllRacks({
        count: response['data']['count'],
        data: response['data']['body']
      })
    );
  }
}

function* getCategoryRacks(payload) {
  const { error, response } = yield call(getCall, '/rack/racksCategory', payload);
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(setCategoryRacks(response['data']['body']));
    EventBus.publish('success', response['data']['body']['message']);
  }
}

/********************* DELETE RACK **********************/

function* deleteRacks({ payload }) {
  const { error, response } = yield call(deleteCall, `/rack/deleteRacks/${payload}`);
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_RACKS' });
    EventBus.publish('success', response['data']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('ADD_RACK', addRack);
  yield takeEvery('GET_ALL_RACKS', getAllRacks);
  yield takeEvery('GET_CATEGORY_RACKS', getCategoryRacks);
  yield takeEvery('DELETE_RACKS', deleteRacks);
  yield takeEvery('UPDATE_RACK', updateRack);
  yield takeEvery('PLACE_RACK', placeProduct);
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
