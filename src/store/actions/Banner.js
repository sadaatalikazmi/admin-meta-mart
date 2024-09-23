/*========== BANNER SLOTS ============= */

export const getCurrentCampaignSlots = (data) => ({
  type: 'GET_CURRENT_CAMPAIGN_SLOTS',
  payload: data,
});

export const setCurrentCampaignSlots = (data) => ({
  type: 'SET_CURRENT_CAMPAIGN_SLOTS',
  payload: data
});

export const getAvailableBannerSlots = (data) => ({
  type: 'GET_AVAILABLE_BANNER_SLOTS',
  payload: data,
});

export const setAvailableBannerSlots = (data) => ({
  type: 'SET_AVAILABLE_BANNER_SLOTS',
  payload: data
});



/*========== BANNERS ============= */

export const draftAdCampaign = (data) => ({
  type: 'DRAFT_AD_CAMPAIGN',
  payload: data
});

export const getBannerMetrics = (data) => ({
  type: 'GET_BANNER_METRICS',
  payload: data
});

export const createBanner = (data) => ({
  type: 'CREATE_BANNER',
  payload: data
});

export const getEditedBannerMetrics = (data) => ({
  type: 'GET_EDITED_BANNER_METRICS',
  payload: data
});

export const editBanner = (data) => ({
  type: 'EDIT_BANNER',
  payload: data
});

export const createPaymentIntent = (data) => ({
  type: 'CREATE_PAYMENT_INTENT',
  payload: data
});

export const setPaymentIntent = (data) => ({
  type: 'SET_PAYMENT_INTENT',
  payload: data
});

export const updateBannerPayment = (data) => ({
  type: 'UPDATE_BANNER_PAYMENT',
  payload: data
});

export const getRunCampaigns = () => ({
  type: 'GET_RUN_CAMPAIGNS'
});

export const setRunCampaigns = (data) => ({
  type: 'SET_RUN_CAMPAIGNS',
  payload: data
});

export const getUserDashboard = (data) => ({
  type: 'GET_USER_DASHBOARD',
  payload: data
});

export const setUserDashboard = (data) => ({
  type: 'SET_USER_DASHBOARD',
  payload: data
});

export const getUserBannersGraph = (data) => ({
  type: 'GET_USER_BANNERS_GRAPH',
  payload: data
});

export const setUserBannersGraph = (data) => ({
  type: 'SET_USER_BANNERS_GRAPH',
  payload: data
});

export const getAllBannersGraph = (data) => ({
  type: 'GET_ALL_BANNERS_GRAPH',
  payload: data
});

export const setAllBannersGraph = (data) => ({
  type: 'SET_ALL_BANNERS_GRAPH',
  payload: data
});

export const getAllBanners = () => ({
  type: 'GET_ALL_BANNERS'
});

export const setAllBanners = (data) => ({
  type: 'SET_ALL_BANNERS',
  payload: data
});

export const getUserBanners = () => ({
  type: 'GET_USER_BANNERS'
});

export const setUserBanners = (data) => ({
  type: 'SET_USER_BANNERS',
  payload: data
});

export const getUserDrafts = () => ({
  type: 'GET_USER_DRAFTS'
});

export const setUserDrafts = (data) => ({
  type: 'SET_USER_DRAFTS',
  payload: data
});

export const getCampaignGraphs = (data) => ({
  type: 'GET_CAMPAIGN_GRAPHS',
  payload: data
});

export const setCampaignGraphs = (data) => ({
  type: 'SET_CAMPAIGN_GRAPHS',
  payload: data
});

export const getCampaign = (data) => ({
  type: 'GET_CAMPAIGN',
  payload: data
});

export const setCampaign = (data) => ({
  type: 'SET_CAMPAIGN',
  payload: data
});

export const getBannerLocations = () => ({
  type: 'GET_BANNER_LOCATIONS',
});

export const setBannerLocations = (data) => ({
  type: 'SET_BANNER_LOCATIONS',
  payload: data
});

export const setBannerStatus = (data) => ({
  type: 'SET_BANNER_STATUS',
  payload: data
});

export const updateBanner = (data) => ({
  type: 'UPDATE_BANNER',
  payload: data
});

export const updateUserBanners = (data) => ({
  type: 'UPDATE_USER_BANNERS',
  payload: data
});

export const updateUserDrafts = (data) => ({
  type: 'UPDATE_USER_DRAFTS',
  payload: data
});

export const getRamadanDates = () => ({
  type: 'GET_RAMADAN_DATES',
});

export const setRamadanDates = (data) => ({
  type: 'SET_RAMADAN_DATES',
  payload: data
});

export const discardDraftCampaign = (data) => ({
  type: 'DISCARD_DRAFT_CAMPAIGN',
  payload: data
});



/*========== BANNER NOTIFICATIONS ============= */

export const getUnreadNotifications = () => ({
  type: 'GET_UNREAD_NOTIFICATIONS',
});

export const setUnreadNotifications = (data) => ({
  type: 'SET_UNREAD_NOTIFICATIONS',
  payload: data
});

export const getUserNotifications = () => ({
  type: 'GET_USER_NOTIFICATIONS',
});

export const setUserNotifications = (data) => ({
  type: 'SET_USER_NOTIFICATIONS',
  payload: data
});

export const getBannerNotification = (data) => ({
  type: 'GET_BANNER_NOTIFICATION',
  payload: data
});

export const setBannerNotification = (data) => ({
  type: 'SET_BANNER_NOTIFICATION',
  payload: data
});

export const markAsRead = (data) => ({
  type: 'MARK_AS_READ',
  payload: data
});

export const updateNotifications = (data) => ({
  type: 'UPDATE_NOTIFICATIONS',
  payload: data
});