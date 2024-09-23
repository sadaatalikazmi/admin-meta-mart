/*========== GET ALL ORDERS ============= */

export const getAllOrders = () => ({
  type: 'GET_ALL_ORDERS'
});
export const getOrdersGraph = () => ({
  type: 'GET_ORDERS_GRAPH'
});
export const getOrdersStats = (data) => ({
  type: 'GET_ORDERS_STATS',
  payload: data
});
export const getEaringsOrdersGraph = () => ({
  type: 'GET_EARINGS_ORDERS_GRAPH'
});
export const getCombinedOrdersGraph = (data) => ({
  type: 'GET_COMBINED_ORDERS_GRAPH',
  payload: data
});
export const getValueVsOrderGraph = (data) => ({
  type: 'GET_VALUE_VS_ORDER_GRAPH',
  payload: data
});
export const getValueSalesByMonthGraph = (data) => ({
  type: 'GET_VALUE_SALES_BY_MONTH_GRAPH',
  payload: data
});
export const getSalesRegisteredByYearGraph = (data) => ({
  type: 'GET_SALES_REGISTERED_BY_YEAR_GRAPH',
  payload: data
});
export const getSalesByHourOfTheDayGraph = (data) => ({
  type: 'GET_SALES_BY_HOUR_OF_THE_DAY_GRAPH',
  payload: data
});
export const getSalesByDayOfTheWeekGraph = (data) => ({
  type: 'GET_SALES_BY_DAY_OF_THE_WEEK_GRAPH',
  payload: data
});
export const getCombinedEarningsGraph = (data) => ({
  type: 'GET_COMBINED_EARNINGS_GRAPH',
  payload: data
});
export const getCountriesGraph = (data) => ({
  type: 'GET_COUNTRIES_GRAPH',
  payload: data
});
export const getGendersGraph = (data) => ({
  type: 'GET_GENDERS_GRAPH',
  payload: data
});
export const getAllOrdersPending = () => ({
  type: 'GET_ALL_ORDERS_PENDING'
});
export const setAllOrders = data => ({
  type: 'SET_ALL_ORDERS',
  payload: data
});
export const setAllOrdersPending = data => ({
  type: 'SET_ALL_ORDERS_PENDING',
  payload: data
});

/*========== SET ORDER STATUS ============= */

export const setStatus = data => ({
  type: 'SET_STATUS',
  payload: data
});

export const updateOrder = data => ({
  type: 'UPDATE_ORDER',
  payload: data
});
