import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setAllOrders } from '../actions/Customer';

/********************* GET ALL ORDERS**********************/

function* getAllOrders() {
  const { error, response } = yield call(getCall, '/order/getAllOrders');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    yield put(
      setAllOrders({
        data: response['data']['body'],
        count: response['data']['count']
      })
    );
  }
}

function* actionWatcher() {
  yield takeEvery('GET_ALL_ORDERS', getAllOrders);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
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