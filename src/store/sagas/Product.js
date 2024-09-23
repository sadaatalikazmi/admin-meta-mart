import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
  setAllProducts,
  toggleAddProductModal,
  setCategoriesProducts,
  setProductCategories,
  setHotProducts,
  setProductQuantity,
} from '../actions/Product';

/*========== ADD PRODUCT FUNCTION =============*/

function* addProduct({ payload: props }) {
  const { formData: payload, successCallback, failCallBack } = props;
  const { error, response } = yield call(postCall, { path: 'product/addProduct', payload });
  if (error) {
    failCallBack();
    EventBus.publish('error', error['response']['data']['message']);
    yield put(toggleAddProductModal(false));
  } else {
    successCallback();
    yield put({ type: 'GET_ALL_PRODUCTS' });
    if (!error) yield put(toggleAddProductModal(false));
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== GET ALL PRODUCT =============*/

function* getAllProducts() {
  yield put({ type: 'GET_ALL_PRODUCTS_PENDING' });
  const { error, response } = yield call(getCall, '/product/getAllProduct');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(
      setAllProducts({
        data: response['data']['body'],
        count: response['data']['count']
      })
    );
    EventBus.publish('success', response['data']['body']['messages']);
  }
}

/*========== GET HOT PRODUCT =============*/

function* getHotProducts() {
  const { error, response } = yield call(getCall, '/product/hot');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(setHotProducts({ data: response['data']['body'] }));
    EventBus.publish('success', response['data']['body']['messages']);
  }
}

/*========== TOP LEAST ITEMS CATEGORIES PRODUCT =============*/

function* getTopItemsPurchasedGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopItemsPurchasedGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_ITEMS_PURCHASE_GRAPH', payload: response['data']['body'] });
}

function* getSalesByGenderGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getSalesByGenderByGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_BY_GENDER_GRAPH', payload: response['data']['body'] });
}

function* getSalesByByAgeGroupGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getSalesByByAgeGroupGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_BY_AGE_GROUP_GRAPH', payload: response['data']['body'] });
}

function* getTopItemsPurchaseByGenderGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopItemsPurchaseByGenderGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_ITEMS_PURCHASE_BY_GENDER_GRAPH', payload: response['data']['body'] });
}

function* getTopCategoriesPurchaseByGenderGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopCategoriesPurchaseByGenderGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_CATEGORIES_PURCHASE_BY_GENDER_GRAPH', payload: response['data']['body'] });
}

function* getSalesByAreaGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getSalesByAreaGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_SALES_BY_AREA_GRAPH', payload: response['data']['body'] });
}
  function* getLeastItemsPurchasedGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getLeastItemsPurchasedGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_LEAST_ITEMS_PURCHASE_GRAPH', payload: response['data']['body'] });
}

function* getTopCategoriesPurchasedGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopCategoriesPurchasedGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_CATEGORIES_PURCHASE_GRAPH', payload: response['data']['body'] });
}

function* getLeastCategoriesPurchasedGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getLeastCategoriesPurchasedGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_LEAST_CATEGORIES_PURCHASE_GRAPH', payload: response['data']['body'] });
}

function* getCategoriesSalesByMonthGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/categoriesSalesByMonthGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_CATEGORIES_SALES_BY_MONTH_GRAPH', payload: response['data']['body'] });
}

function* getTopItemsPurchaseByCategoryGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopItemsPurchaseByCategoryGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_ITEMS_PURCHASE_BY_CATEGORY_GRAPH', payload: response['data']['body'] });
}

function* getLeastItemsPurchaseByCategoryGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getLeastItemsPurchaseByCategoryGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_LEAST_ITEMS_PURCHASE_BY_CATEGORY_GRAPH', payload: response['data']['body'] });
}

function* getTopItemsPurchaseSubCategoryGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getTopItemsPurchaseSubCategoryGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_TOP_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH', payload: response['data']['body'] });
}

function* getLeastItemsPurchaseSubCategoryGraph({ payload }) {
  const { error, response } = yield call(postCall, { path: '/PRODUCT/getLeastItemsPurchaseSubCategoryGraph', payload });
  if (error) EventBus.publish('error', error['message']['data']['message']);
  else yield put({ type: 'SET_LEAST_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH', payload: response['data']['body'] });
}

/*========== GET PRODUCT QUANTITY =============*/

function* getProductQuantity() {
  const { error, response } = yield call(getCall, '/product/productQuantity');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(setProductQuantity({ data: response['data']['body'] }));
    EventBus.publish('success', response['data']['body']['messages']);
  }
}

/*========== GET PRODUCT CATEGORIES =============*/

function* getProductCategories() {
  const { error, response } = yield call(getCall, '/product/productCategories');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(setProductCategories(response['data']['body']));
    EventBus.publish('success', response['data']['body']['messages']);
  }
}

/*========== GET CATEGORIES PRODUCTS =============*/

function* getCategoriesProducts({ payload }) {
  const { error, response } = yield call(
    getCall,
    `/product/getCategoriesProducts/${payload}`
  );
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put(setCategoriesProducts(response['data']['body']));
    EventBus.publish('success', response['data']['body']['messages']);
  }
}

/*========== PLACE PRODUCT =============*/

function* setPlaceProduct({ payload }) {

  const { error, response } = yield call(putCall, { path: '/product/placingProducts', payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_PRODUCTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== UPDATE PRODUCT =============*/

function* updateProduct({ payload: props }) {
  const { formData: payload, successCallback, failCallBack } = props;
  const { error, response } = yield call(putCall, {
    path: '/product/updateProduct',
    payload
  });
  if (error) {
    failCallBack();
    EventBus.publish('error', error['response']['data']['message']);
  }
  else {
    successCallback();
    yield put({ type: 'GET_ALL_PRODUCTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== UPLOAD PRODUCT =============*/

function* uploadProducts({ payload: props }) {
  const { formData: payload, successCallback, failCallBack } = props;
  const { error, response } = yield call(postCall, {
    path: '/product/data',
    payload
  });
  if (error) {
    failCallBack();
    EventBus.publish('error', error['response']['data']['message']);
  }
  else {
    successCallback();
    yield put({ type: 'GET_ALL_PRODUCTS' });
    yield put({ type: 'GET_ALL_SLOTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

/*========== DELETE PRODUCT =============*/

function* deleteProduct({ payload }) {
  const { error, response } = yield call(
    deleteCall,
    `/product/deleteProduct/${payload}`
  );
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else {
    yield put({ type: 'GET_ALL_PRODUCTS' });
    EventBus.publish('success', response['data']['message']);
  }
}

function* actionWatcher() {
  yield takeEvery('ADD_PRODUCT', addProduct);
  yield takeEvery('GET_ALL_PRODUCTS', getAllProducts);
  yield takeEvery('GET_HOT_PRODUCTS', getHotProducts);
  yield takeEvery('GET_TOP_ITEMS_PURCHASE_GRAPH', getTopItemsPurchasedGraph);
  yield takeEvery('GET_SALES_BY_GENDER_GRAPH', getSalesByGenderGraph);
  yield takeEvery('GET_SALES_BY_AGE_GROUP_GRAPH', getSalesByByAgeGroupGraph);
  yield takeEvery('GET_TOP_ITEMS_PURCHASE_BY_GENDER_GRAPH', getTopItemsPurchaseByGenderGraph);
  yield takeEvery('GET_TOP_CATEGORIES_PURCHASE_BY_GENDER_GRAPH', getTopCategoriesPurchaseByGenderGraph);
  yield takeEvery('GET_SALES_BY_AREA_GRAPH', getSalesByAreaGraph);
  yield takeEvery('GET_LEAST_ITEMS_PURCHASE_GRAPH', getLeastItemsPurchasedGraph);
  yield takeEvery('GET_TOP_CATEGORIES_PURCHASE_GRAPH', getTopCategoriesPurchasedGraph);
  yield takeEvery('GET_LEAST_CATEGORIES_PURCHASE_GRAPH', getLeastCategoriesPurchasedGraph);
  yield takeEvery('GET_CATEGORIES_SALES_BY_MONTH_GRAPH', getCategoriesSalesByMonthGraph);
  yield takeEvery('GET_TOP_ITEMS_PURCHASE_BY_CATEGORY_GRAPH', getTopItemsPurchaseByCategoryGraph);
  yield takeEvery('GET_LEAST_ITEMS_PURCHASE_BY_CATEGORY_GRAPH', getLeastItemsPurchaseByCategoryGraph);
  yield takeEvery('GET_TOP_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH', getTopItemsPurchaseSubCategoryGraph);
  yield takeEvery('GET_LEAST_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH', getLeastItemsPurchaseSubCategoryGraph);
  yield takeEvery('GET_PRODUCT_QUANTITY', getProductQuantity);
  yield takeEvery('GET_PRODUCT_CATEGORIES', getProductCategories);
  yield takeEvery('GET_CATEGORIES_PRODUCTS', getCategoriesProducts);
  yield takeEvery('SET_PLACE_PRODUCT', setPlaceProduct);
  yield takeEvery('DELETE_PRODUCT', deleteProduct);
  yield takeEvery('UPDATE_PRODUCT', updateProduct);
  yield takeEvery('UPLOAD_PRODUCTS', uploadProducts);
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
