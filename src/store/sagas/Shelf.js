import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import { setAllShelves, setRackShelves } from '../actions/Shelf';

/*========== ADD SHELF FUNCTIONS =============*/

function* addShelf({ payload }) {
  const { error, response } = yield call(postCall, { path: 'shelf/createShelf', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SHELVES' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== UPDATE SHELF FUNCTIONS =============*/

function* updateShelf({ payload }) {
  const { error, response } = yield call(putCall, { path: 'shelf/updateShelf', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SHELVES' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== GET ALL SHELVES =============*/

function* getAllShelves() {
  yield put({ type: 'GET_ALL_SHELVES_PENDING' });
  const { error, response } = yield call(getCall, '/shelf/getAllShelf');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(
      setAllShelves({
        count: response['data']['count'],
        data: response['data']['body']
      })
    );
  }
}

/*========== GET ALL SHELVES =============*/

function* getRackShelves({ payload }) {
  const { error, response } = yield call(getCall, `/shelf/getRackShelves/${payload}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else yield put(setRackShelves(response['data']['body']));
}

/*========== DELETE SHELF =============*/

function* deleteShelf({ payload }) {
  const { error, response } = yield call(deleteCall, `/shelf/deleteShelf/${payload}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_SHELVES' });
    EventBus.publish('success', response['data']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('ADD_SHELF', addShelf);
  yield takeEvery('UPDATE_SHELF', updateShelf);
  yield takeEvery('GET_ALL_SHELVES', getAllShelves);
  yield takeEvery('GET_RACK_SHELVES', getRackShelves);
  yield takeEvery('DELETE_SHELF', deleteShelf);
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
