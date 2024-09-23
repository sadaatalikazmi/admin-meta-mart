import { PURGE } from 'redux-persist';

let initialState = {
  bannerMetrics: null,
  paymentIntent: null,
  runCampaigns: null,
  scorecard: null,
  dailyCostByOsGraph: null,
  dailyCostByDeviceGraph: null,
  interactionRateAndCostByOsGraph: null,
  interactionRateAndCostByDeviceGraph: null,
  interactionsByOsGraph: null,
  interactionsByDeviceGraph: null,
  campaignPerformanceTable: null,
  userBannerIdImpressionsGraph: null,
  userSlotTypeImpressionsGraph: null,
  userBannerIdAmountGraph: null,
  userSlotTypeAmountGraph: null,
  allBannerIdImpressionsGraph: null,
  allSlotTypeImpressionsGraph: null,
  allBannerIdAmountGraph: null,
  allSlotTypeAmountGraph: null,
  currentCampaignSlots: null,
  availableBannerSlots: null,
  availableBannerSlotsCount: null,
  bannerImpressionsGraph: null,
  bannerSlotTypeGraph: null,
  campaign: null,
  bannerLocations: null,
  unreadNotifications: null,
  userNotifications: [],
  bannerNotification: null,
  allBanners: [],
  userBanners: [],
  userDrafts: [],
  ramadanDates: null,
};

const Banner = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;



    /*========== BANNER SLOT REDUCERS ============= */

    case 'SET_CURRENT_CAMPAIGN_SLOTS':
      return {
        ...state,
        currentCampaignSlots: payload.data,
      };

    case 'SET_AVAILABLE_BANNER_SLOTS':
      return {
        ...state,
        availableBannerSlots: payload.data,
        availableBannerSlotsCount: payload.count,
      };



    /*========== BANNER REDUCERS ============= */

    case 'SET_BANNER_METRICS':
      return {
        ...state,
        bannerMetrics: payload.data,
      };

    case 'SET_PAYMENT_INTENT':
      return {
        ...state,
        paymentIntent: payload.data,
      };

    case 'SET_RUN_CAMPAIGNS':
      return {
        ...state,
        runCampaigns: payload.data,
      };

    case 'SET_USER_DASHBOARD':
      return {
        ...state,
        scorecard: {
          scorecardData: payload?.data?.scorecard?.scorecardData,
          labels: payload?.data?.scorecard?.labels,
          series: payload?.data?.scorecard?.series,
        },
        dailyCostByOsGraph: {
          labels: payload?.data?.dailyCostGraph?.labels,
          series: payload?.data?.dailyCostGraph?.series?.os,
        },
        dailyCostByDeviceGraph: {
          labels: payload?.data?.dailyCostGraph?.labels,
          series: payload?.data?.dailyCostGraph?.series?.device,
        },
        interactionRateAndCostByOsGraph: {
          labels: payload?.data?.interactionRateAndCostGraph?.os?.labels,
          series: payload?.data?.interactionRateAndCostGraph?.os?.series,
        },
        interactionRateAndCostByDeviceGraph: {
          labels: payload?.data?.interactionRateAndCostGraph?.device?.labels,
          series: payload?.data?.interactionRateAndCostGraph?.device?.series,
        },
        interactionsByOsGraph: {
          labels: payload?.data?.interactionsGraph?.os?.labels,
          series: payload?.data?.interactionsGraph?.os?.series,
        },
        interactionsByDeviceGraph: {
          labels: payload?.data?.interactionsGraph?.device?.labels,
          series: payload?.data?.interactionsGraph?.device?.series,
        },
        campaignPerformanceTable: payload?.data?.campaignPerformanceTable,
      };

    case 'SET_USER_BANNERS_GRAPH':
      return {
        ...state,
        userBannerIdImpressionsGraph: {
          labels: payload?.data?.bannerIdGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.bannerIdGraph?.series[0],
            maleImpressionsGraph: payload?.data?.bannerIdGraph?.series[1],
            femaleImpressionsGraph: payload?.data?.bannerIdGraph?.series[2],
          },
        },
        userSlotTypeImpressionsGraph: {
          labels: payload?.data?.slotTypeGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.slotTypeGraph?.series[0],
            maleImpressionsGraph: payload?.data?.slotTypeGraph?.series[1],
            femaleImpressionsGraph: payload?.data?.slotTypeGraph?.series[2],
          },
        },
        userBannerIdAmountGraph: {
          labels: payload?.data?.bannerIdGraph?.labels,
          series: payload?.data?.bannerIdGraph?.series[3],
        },
        userSlotTypeAmountGraph: {
          labels: payload?.data?.slotTypeGraph?.labels,
          series: payload?.data?.slotTypeGraph?.series[3],
        },
      };

    case 'SET_ALL_BANNERS_GRAPH':
      return {
        ...state,
        allBannerIdImpressionsGraph: {
          labels: payload?.data?.bannerIdGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.bannerIdGraph?.series[0],
            maleImpressionsGraph: payload?.data?.bannerIdGraph?.series[1],
            femaleImpressionsGraph: payload?.data?.bannerIdGraph?.series[2],
          },
        },
        allSlotTypeImpressionsGraph: {
          labels: payload?.data?.slotTypeGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.slotTypeGraph?.series[0],
            maleImpressionsGraph: payload?.data?.slotTypeGraph?.series[1],
            femaleImpressionsGraph: payload?.data?.slotTypeGraph?.series[2],
          },
        },
        allBannerIdAmountGraph: {
          labels: payload?.data?.bannerIdGraph?.labels,
          series: payload?.data?.bannerIdGraph?.series[3],
        },
        allSlotTypeAmountGraph: {
          labels: payload?.data?.slotTypeGraph?.labels,
          series: payload?.data?.slotTypeGraph?.series[3],
        },
      };

    case 'SET_CAMPAIGN_GRAPHS':
      return {
        ...state,
        bannerImpressionsGraph: {
          labels: payload?.data?.impressionsGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.impressionsGraph?.series?.impressions,
            maleImpressionsGraph: payload?.data?.impressionsGraph?.series?.maleImpressions,
            femaleImpressionsGraph: payload?.data?.impressionsGraph?.series?.femaleImpressions,
          },
        },
        bannerSlotTypeGraph: {
          labels: payload?.data?.slotTypeGraph?.labels,
          series: {
            impressionsGraph: payload?.data?.slotTypeGraph?.series?.impressions,
            maleImpressionsGraph: payload?.data?.slotTypeGraph?.series?.maleImpressions,
            femaleImpressionsGraph: payload?.data?.slotTypeGraph?.series?.femaleImpressions,
            amount: payload?.data?.slotTypeGraph?.series?.amount,
          },
        }
      };

    case 'SET_ALL_BANNERS':
      return {
        ...state,
        allBanners: payload.data,
      };

    case 'SET_USER_BANNERS':
      return {
        ...state,
        userBanners: payload.data,
      };

    case 'SET_USER_DRAFTS':
      return {
        ...state,
        userDrafts: payload.data,
      };

    case 'SET_CAMPAIGN':
      return {
        ...state,
        campaign: payload.data,
      };

    case 'SET_BANNER_LOCATIONS':
      return {
        ...state,
        bannerLocations: payload.data,
      };

    case 'UPDATE_BANNER':
      return {
        ...state,
        allBanners: state.allBanners.map(el => el.id === payload.id ? payload : el)
      };

    case 'UPDATE_USER_BANNERS':
      return {
        ...state,
        userBanners: state.userBanners.map(el => el.id === payload.id ? payload : el)
      };

    case 'UPDATE_USER_DRAFTS':
      return {
        ...state,
        userDrafts: state.userDrafts.filter(el => el.id !== payload)
      };

    case 'SET_RAMADAN_DATES':
      return {
        ...state,
        ramadanDates: payload.data
      };



    /*========== BANNER NOTIFICATION REDUCERS ============= */

    case 'SET_UNREAD_NOTIFICATIONS':
      return {
        ...state,
        unreadNotifications: payload.data,
      };

    case 'SET_USER_NOTIFICATIONS':
      return {
        ...state,
        userNotifications: payload.data,
      };

    case 'SET_BANNER_NOTIFICATION':
      return {
        ...state,
        bannerNotification: payload.data,
      };

    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        unreadNotifications: state.unreadNotifications.filter(el => el.id !== payload.id),
        userNotifications: state.userNotifications.map(el => el.id === payload.id ? payload : el),
      };

    default:
      return state;
  }
};

export default Banner;
