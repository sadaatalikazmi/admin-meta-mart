
import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
    setPaymentIntent,
    setUserBannersGraph,
    setAllBannersGraph,
    setAvailableBannerSlots,
    setCurrentCampaignSlots,
    setAllBanners,
    setUserBanners,
    setUserDrafts,
    setCampaignGraphs,
    setCampaign,
    setBannerLocations,
    setUnreadNotifications,
    setUserNotifications,
    setBannerNotification,
    updateNotifications,
    updateBanner,
    updateUserBanners,
    setRamadanDates,
    updateUserDrafts,
    setRunCampaigns,
    setUserDashboard,
} from '../actions/Banner';



/********************* BANNER SLOTS **********************/

function* getCurrentCampaignSlots({ payload }) {
    const { error, response } = yield call(getCall, `/bannerSlot/getCurrentCampaignSlots/${payload}`);
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setCurrentCampaignSlots({ data: response['data']['body'] }));
}

function* getAvailableBannerSlots({ payload }) {
    const { error, response } = yield call(postCall, { path: `/bannerSlot/getAvailableBannerSlots`, payload });
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else {
        yield put(setAvailableBannerSlots({ data: response['data']['body'], count: response['data']['count'] }));
        if (response['data']['count'] == 0) EventBus.publish('error', response['data']['message']);
    }
}



/********************* BANNERS **********************/

function* draftAdCampaign({ payload: props }) {
    const { requestData: payload, successCallback, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: '/banner/draftAdCampaign', payload });
    if (error) {
        failCallBack();
        EventBus.publish('error', error['response']['data']['message']);
    } else successCallback(response['data']['body']);
}

function* getBannerMetrics({ payload: props }) {
    const { requestData: payload, successCallback, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: '/banner/getBannerMetrics', payload });
    if (error) {
        failCallBack();
        EventBus.publish('error', error['response']['data']['message']);
    } else successCallback(response['data']['body']);
}

function* createBanner({ payload: props }) {
    const { formData: payload, successCallback, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: '/banner/createBanner', payload });
    if (error) {
        failCallBack();
        EventBus.publish('error', error['response']['data']['message']);
    } else {
        successCallback(response['data']['body']);
        EventBus.publish('success', response['data']['message']);
    }
}

function* getEditedBannerMetrics({ payload: props }) {
    const { requestData: payload, successCallback, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: '/banner/getEditedBannerMetrics', payload });
    if (error) {
        failCallBack();
        EventBus.publish('error', error['response']['data']['message']);
    } else successCallback(response['data']['body']);
}

function* editBanner({ payload: props }) {
    const { formData: payload, successCallback, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: '/banner/editBanner', payload });
    if (error) {
        failCallBack();
        EventBus.publish('error', error['response']['data']['message']);
    } else {
        successCallback(response['data']['body']);
        EventBus.publish('success', response['data']['message']);
    }
}

function* createPaymentIntent({ payload }) {
    const { error, response } = yield call(postCall, { path: '/banner/createPaymentIntent', payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setPaymentIntent({ data: response['data']['body'] }));
}

function* updateBannerPayment({ payload }) {
    const { error, response } = yield call(putCall, { path: `/banner/updateBannerPayment`, payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(updateUserBanners(response['data']['body']));
}

function* getRunCampaigns() {
    const { error, response } = yield call(getCall, '/banner/getRunCampaigns');
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setRunCampaigns({ data: response['data']['body'], count: response['data']['count'] }));
}

function* getUserDashboard({ payload }) {
    const { error, response } = yield call(postCall, { path: '/banner/getUserDashboard', payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setUserDashboard({ data: response['data']['body'] }));
}

function* getUserBannersGraph({ payload }) {
    const { error, response } = yield call(postCall, { path: '/banner/getUserBannersGraph', payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setUserBannersGraph({ data: response['data']['body'] }));
}

function* getAllBannersGraph({ payload }) {
    const { error, response } = yield call(postCall, { path: '/banner/getAllBannersGraph', payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setAllBannersGraph({ data: response['data']['body'] }));
}

function* getAllBanners() {
    const { error, response } = yield call(getCall, '/banner/getAllBanners');
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setAllBanners({ data: response['data']['body'], count: response['data']['count'] }));
}

function* getUserBanners() {
    const { error, response } = yield call(getCall, '/banner/getUserBanners');
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setUserBanners({ data: response['data']['body'], count: response['data']['count'] }));
}

function* getUserDrafts() {
    const { error, response } = yield call(getCall, '/banner/getUserDraftCampaigns');
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setUserDrafts({ data: response['data']['body'], count: response['data']['count'] }));
}

function* getCampaignGraphs({ payload }) {
    const { error, response } = yield call(postCall, { path: '/banner/getCampaignGraphs', payload });
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setCampaignGraphs({ data: response['data']['body'] }));
}

function* getCampaign({ payload }) {
    const { error, response } = yield call(getCall, `/banner/getCampaign/${payload}`);
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setCampaign({ data: response['data']['body'], count: response['data']['count'] }));
}

function* getBannerLocations() {
    const { error, response } = yield call(getCall, `/banner/getBannerLocations`);
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setBannerLocations({ data: response['data']['body'] }));
}

function* setBannerStatus({ payload }) {
    const { error, response } = yield call(putCall, { path: '/banner/setStatus', payload });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else {
        yield put(updateBanner(response['data']['body']));
        EventBus.publish('success', response['data']['message']);
    }
}

function* getRamadanDates() {
    const { error, response } = yield call(getCall, `/banner/getRamadanDates`);
    if (error) EventBus.publish('error', error['message']['data']['message']);
    else yield put(setRamadanDates({ data: response['data']['body'], count: response['data']['count'] }));
}

function* discardDraftCampaign({ payload }) {
    const { error, response } = yield call(deleteCall, `/banner/discardDraftCampaign/${payload}`);
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(updateUserDrafts(payload));
}




/********************* BANNER NOTIFICATIONS **********************/

function* getUnreadNotifications() {
    const { error, response } = yield call(getCall, `/banner/getUnreadNotifications`);
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setUnreadNotifications({ data: response['data']['body'], count: response['data']['results'] }));
}

function* getUserNotifications() {
    const { error, response } = yield call(getCall, `/banner/getUserNotifications`);
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(setUserNotifications({ data: response['data']['body'], count: response['data']['results'] }));
}

function* getBannerNotification({ payload }) {
    const { error, response } = yield call(getCall, `/banner/getBannerNotification/${payload}`);
    // if (error) EventBus.publish('error', error['message']['data']['message']);
    if (error) yield put(setBannerNotification({ data: null }));
    else yield put(setBannerNotification({ data: response['data']['body'], count: response['data']['results'] }));
}

function* markAsRead({ payload }) {
    const { error, response } = yield call(putCall, { path: `/banner/markAsRead/${payload}` });
    if (error) EventBus.publish('error', error['response']['data']['message']);
    else yield put(updateNotifications(response['data']['body']));
}




function* actionWatcher() {
    yield takeEvery('GET_BANNER_LOCATIONS', getBannerLocations);
    yield takeEvery('GET_CURRENT_CAMPAIGN_SLOTS', getCurrentCampaignSlots);
    yield takeEvery('GET_AVAILABLE_BANNER_SLOTS', getAvailableBannerSlots);
    yield takeEvery('DRAFT_AD_CAMPAIGN', draftAdCampaign);
    yield takeEvery('GET_BANNER_METRICS', getBannerMetrics);
    yield takeEvery('CREATE_BANNER', createBanner);
    yield takeEvery('GET_EDITED_BANNER_METRICS', getEditedBannerMetrics);
    yield takeEvery('EDIT_BANNER', editBanner);
    yield takeEvery('CREATE_PAYMENT_INTENT', createPaymentIntent);
    yield takeEvery('UPDATE_BANNER_PAYMENT', updateBannerPayment);
    yield takeEvery('GET_RUN_CAMPAIGNS', getRunCampaigns);
    yield takeEvery('GET_USER_DASHBOARD', getUserDashboard);
    yield takeEvery('GET_USER_BANNERS_GRAPH', getUserBannersGraph);
    yield takeEvery('GET_ALL_BANNERS_GRAPH', getAllBannersGraph);
    yield takeEvery('GET_CAMPAIGN_GRAPHS', getCampaignGraphs);
    yield takeEvery('GET_ALL_BANNERS', getAllBanners);
    yield takeEvery('GET_USER_BANNERS', getUserBanners);
    yield takeEvery('GET_USER_DRAFTS', getUserDrafts);
    yield takeEvery('GET_CAMPAIGN', getCampaign);
    yield takeEvery('GET_UNREAD_NOTIFICATIONS', getUnreadNotifications);
    yield takeEvery('MARK_AS_READ', markAsRead);
    yield takeEvery('GET_USER_NOTIFICATIONS', getUserNotifications);
    yield takeEvery('GET_BANNER_NOTIFICATION', getBannerNotification);
    yield takeEvery('SET_BANNER_STATUS', setBannerStatus);
    yield takeEvery('GET_RAMADAN_DATES', getRamadanDates);
    yield takeEvery('DISCARD_DRAFT_CAMPAIGN', discardDraftCampaign);
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
