/*========== GET ALL ORDERS============= */

export const getAllOrders = () => ({
    type: 'GET_ALL_ORDERS',
  })
  
  export const setAllOrders = (data) => ({
    type: 'SET_ALL_ORDERS',
    payload: data
  })
