import axios from 'axios';
import jwt_decode from 'jwt-decode';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setLoader, setLoginData } from '../actions/Auth';



/*========== REGISTER FUNCTIONS =============*/

function* register({ payload, history }) {
  const { error, response } = yield call(postCall, { path: '/user/signup', payload });
  if (error) EventBus.publish('error-login', error['response'] && error['response']['data']['message']);
  else if (response) {
    const decoded = jwt_decode(response['data']['body']['token']);
    if (!['admin', 'super-admin', 'advertiser'].includes(decoded['role'])) {
      EventBus.publish('error', "Can't login through other account. please use admin or advertiser account");
      return;
    }
    yield put(setLoader(response['data']['body']['token']));
    yield put(
      setLoginData({
        token: response['data']['body']['token'],
        user: response['data']['body']['user']
      })
    );
    EventBus.publish('success', response['data']['body']['message']);
    setTimeout(() => history.push('/advertiser'), 1000);
    EventBus.publish(response['data']['body']['message']);
    setTimeout(() => history.push('/advertiser'), 200);
  }
  yield put(setLoader(false));
};



/*========== LOGIN FUNCTIONS =============*/

function* login({ payload, history }) {
  const { error, response } = yield call(postCall, { path: '/user/login', payload });
  if (error) EventBus.publish('error-login', error['response'] && error['response']['data']['message']);
  else if (response) {
    const decoded = jwt_decode(response['data']['body']['token']);
    if (!['admin', 'super-admin', 'advertiser'].includes(decoded['role'])) {
      EventBus.publish('error', "Can't login through other account. please use admin or advertiser account");
      return;
    }
    yield put(setLoader(response['data']['body']['token']));
    yield put(
      setLoginData({
        token: response['data']['body']['token'],
        user: response['data']['body']['user']
      })
    );
    EventBus.publish('success', response['data']['body']['message']);
    if (['admin', 'super-admin'].includes(decoded['role'])) setTimeout(() => history.push('/home'), 1000);
    else setTimeout(() => history.push('/advertiser/createBanner'), 1000);
    EventBus.publish(response['data']['body']['message']);
    if (['admin', 'super-admin'].includes(decoded['role'])) setTimeout(() => history.push('/home'), 200);
    else setTimeout(() => history.push('/advertiser/createBanner'), 200);
  }
  yield put(setLoader(false));
};



function* actionWatcher() {
  yield takeEvery('REGISTER', register);
  yield takeEvery('LOGIN', login);
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

function getCall({ path }) {
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
