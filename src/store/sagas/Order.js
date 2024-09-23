import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setAllOrders, updateOrder } from '../actions/Order';

/********************* GET ALL ORDERS **********************/

function* getOrdersGraph() {

  const { error, response } = yield call(getCall, '/order/orders-graphs');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_ORDERS_GRAPH', payload: response['data']['body'] });
}

function* getEaringsOrdersGraph() {
  const { error, response } = yield call(getCall, '/order/earning-graphs');
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_EARNINGS_ORDERS_GRAPH', payload: response['data']['body'] });
}

function* getCombinedOrdersGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/combined-orders-graphs', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_COMBINED_ORDERS_GRAPH', payload: response['data']['body'] });
}

function* getValueVsOrderGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/valueVsOrderGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_VALUE_VS_ORDER_GRAPH', payload: response['data']['body'] });
}

function* getValueSalesByMonthGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/valueSalesByMonthGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_VALUE_SALES_BY_MONTH_GRAPH', payload: response['data']['body'] });
}

function* getSalesRegisteredByYearGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/salesRegisteredByYearGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_REGISTERED_BY_YEAR_GRAPH', payload: response['data']['body'] });
}

function* getSalesByHourOfTheDayGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/salesByHourOfTheDayGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_BY_HOUR_OF_THE_DAY_GRAPH', payload: response['data']['body'] });
}

function* getSalesByDayOfTheWeekGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/salesByDayOfTheWeekGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_BY_DAY_OF_THE_WEEK_GRAPH', payload: response['data']['body'] });
}

function* getCombinedEarningsGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/combined-earnings-graphs', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_COMBINED_EARNINGS_GRAPH', payload: response['data']['body'] });
}

function* getCountriesGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/countries-graphs', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_COUNTRIES_GRAPH', payload: response['data']['body'] });
}

function* getGendersGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/genders-graphs', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_GENDERS_GRAPH', payload: response['data']['body'] });
}

function* getOrdersStats({ payload }) {
  const { error, response } = yield call(postCall, { path: '/order/orders-stats', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_ORDERS_STATS', payload: response['data']['body'] });
}

function* getAllOrders() {
  yield put({ type: 'GET_ALL_ORDERS_PENDING' });

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

/********************* SET ORDER STATUS **********************/

function* setStatus({ payload }) {
  const { error, response } = yield call(putCall, { path: '/order/setStatus', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else {
    updateOrder(response['data']['body'])
    EventBus.publish('success', response['data']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('GET_ALL_ORDERS', getAllOrders);
  yield takeEvery('SET_STATUS', setStatus);
  yield takeEvery('GET_ORDERS_GRAPH', getOrdersGraph);
  yield takeEvery('GET_EARINGS_ORDERS_GRAPH', getEaringsOrdersGraph);
  yield takeEvery('GET_COMBINED_ORDERS_GRAPH', getCombinedOrdersGraph);
  yield takeEvery('GET_VALUE_VS_ORDER_GRAPH', getValueVsOrderGraph);
  yield takeEvery('GET_VALUE_SALES_BY_MONTH_GRAPH', getValueSalesByMonthGraph);
  yield takeEvery('GET_SALES_REGISTERED_BY_YEAR_GRAPH', getSalesRegisteredByYearGraph);
  yield takeEvery('GET_SALES_BY_HOUR_OF_THE_DAY_GRAPH', getSalesByHourOfTheDayGraph);
  yield takeEvery('GET_SALES_BY_DAY_OF_THE_WEEK_GRAPH', getSalesByDayOfTheWeekGraph);
  yield takeEvery('GET_COMBINED_EARNINGS_GRAPH', getCombinedEarningsGraph);
  yield takeEvery('GET_COUNTRIES_GRAPH', getCountriesGraph);
  yield takeEvery('GET_GENDERS_GRAPH', getGendersGraph);
  yield takeEvery('GET_ORDERS_STATS', getOrdersStats);
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
