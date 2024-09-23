import { PURGE } from 'redux-persist';

let initialState = {
  allOrders: [],
  fetching: true,
  count: 0,
  ordersGraph: null,
  earningsGraph: null,
  combinedOrdersGraph: null,
  valueVsOrderGraph: null,
  valueSalesByMonthGraph: null,
  salesRegisteredByYearGraph: null,
  salesByHourOfTheDayGraph: null,
  salesByDayOfTheWeekGraph: null,
  combinedEarningsGraph: null,
  countriesGraph: null,
  gendersGraph: null,
  stats: {}
};

const Order = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== ORDER REDUCERS ============= */

    case 'SET_ALL_ORDERS':
      return {
        ...state,
        fetching: false,
        allOrders: payload.data,
        count: payload.count || state.count
      };

    case 'SET_ORDERS_STATS':
      return {
        ...state,
        stats: {
          ...payload
        }
      };

    case 'SET_ORDERS_GRAPH':
      return {
        ...state,
        ordersGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'SET_EARNINGS_ORDERS_GRAPH':
      return {
        ...state,
        earningsGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'SET_COMBINED_ORDERS_GRAPH':
      return {
        ...state,
        combinedOrdersGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'SET_VALUE_VS_ORDER_GRAPH':
      return {
        ...state,
        valueVsOrderGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_VALUE_SALES_BY_MONTH_GRAPH':
      return {
        ...state,
        valueSalesByMonthGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_SALES_REGISTERED_BY_YEAR_GRAPH':
      return {
        ...state,
        salesRegisteredByYearGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_SALES_BY_HOUR_OF_THE_DAY_GRAPH':
      return {
        ...state,
        salesByHourOfTheDayGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_SALES_BY_DAY_OF_THE_WEEK_GRAPH':
      return {
        ...state,
        salesByDayOfTheWeekGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_COMBINED_EARNINGS_GRAPH':
      return {
        ...state,
        combinedEarningsGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'SET_COUNTRIES_GRAPH':
      return {
        ...state,
        countriesGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'SET_GENDERS_GRAPH':
      return {
        ...state,
        gendersGraph: {
          graph_hourly: payload.graph_hourly,
          graph_weekly: payload.graph_weekly,
          graph_1m: payload.graph_1m,
        }
      };

    case 'GET_ALL_ORDERS_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'UPDATE_ORDER':
      return {
        ...state,
        allOrders: state.allOrders.map(
          el => el._id === payload._id ? payload : el
        )
      };

    default:
      return state;
  }
};

export default Order;
