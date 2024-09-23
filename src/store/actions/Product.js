/*========== ADD PRODUCT ============= */

export const addProduct = data => ({
  type: 'ADD_PRODUCT',
  payload: data
});

export const toggleAddProductModal = data => ({
  type: 'TOGGLE_ADD_PRODUCT_MODAL',
  payload: data
});

/*========== GET ALL PRODUCT============= */

export const getAllProducts = () => ({
  type: 'GET_ALL_PRODUCTS'
});
export const getAllProductsPending = () => ({
  type: 'GET_ALL_PRODUCTS_PENDING'
});

export const uploadProducts = (data) => ({
  type: 'UPLOAD_PRODUCTS',
  payload: data
});

export const setAllProducts = data => ({
  type: 'SET_ALL_PRODUCTS',
  payload: data
});

/*========== GET HOT PRODUCTS ============= */

export const getHotProducts = () => ({
  type: 'GET_HOT_PRODUCTS',
});

export const setHotProducts = data => ({
  type: 'SET_HOT_PRODUCTS',
  payload: data
});

export const getTopItemsPurchasedGraph = (data) => ({
  type: 'GET_TOP_ITEMS_PURCHASE_GRAPH',
  payload: data
});

export const getSalesByGenderGraph = (data) => ({
  type: 'GET_SALES_BY_GENDER_GRAPH',
  payload: data
});

export const getSalesByByAgeGroupGraph = (data) => ({
  type: 'GET_SALES_BY_AGE_GROUP_GRAPH',
  payload: data
});

export const getTopItemsPurchaseByGenderGraph = (data) => ({
  type: 'GET_TOP_ITEMS_PURCHASE_BY_GENDER_GRAPH',
  payload: data
});

export const getTopCategoriesPurchaseByGenderGraph = (data) => ({
  type: 'GET_TOP_CATEGORIES_PURCHASE_BY_GENDER_GRAPH',
  payload: data
});

export const getSalesByAreaGraph = (data) => ({
  type: 'GET_SALES_BY_AREA_GRAPH',
  payload: data
});

export const getLeastItemsPurchasedGraph = (data) => ({
  type: 'GET_LEAST_ITEMS_PURCHASE_GRAPH',
  payload: data
});

export const getTopCategoriesPurchasedGraph = (data) => ({
  type: 'GET_TOP_CATEGORIES_PURCHASE_GRAPH',
  payload: data
});

export const getLeastCategoriesPurchasedGraph = (data) => ({
  type: 'GET_LEAST_CATEGORIES_PURCHASE_GRAPH',
  payload: data
});

export const getCategoriesSalesByMonthGraph = (data) => ({
  type: 'GET_CATEGORIES_SALES_BY_MONTH_GRAPH',
  payload: data
});

export const getTopItemsPurchaseByCategoryGraph = (data) => ({
  type: 'GET_TOP_ITEMS_PURCHASE_BY_CATEGORY_GRAPH',
  payload: data
});

export const getLeastItemsPurchaseByCategoryGraph = (data) => ({
  type: 'GET_LEAST_ITEMS_PURCHASE_BY_CATEGORY_GRAPH',
  payload: data
});

export const getTopItemsPurchaseSubCategoryGraph = (data) => ({
  type: 'GET_TOP_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH',
  payload: data
});

export const getLeastItemsPurchaseSubCategoryGraph = (data) => ({
  type: 'GET_LEAST_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH',
  payload: data
});

/*========== GET PRODUCT QUANTITY ============= */

export const getProductQuantity = () => ({
  type: 'GET_PRODUCT_QUANTITY',
});

export const setProductQuantity = data => ({
  type: 'SET_PRODUCT_QUANTITY',
  payload: data
});

/*========== GET PRODUCT CATEGORIES ============= */

export const getProductCategories = () => ({
  type: 'GET_PRODUCT_CATEGORIES'
});

export const setProductCategories = data => ({
  type: 'SET_PRODUCT_CATEGORIES',
  payload: data
});
/*========== GET CATEGORIES PRODUCT LIST ============= */

export const getCategoriesProducts = data => ({
  type: 'GET_CATEGORIES_PRODUCTS',
  payload: data
});

export const setCategoriesProducts = data => ({
  type: 'SET_CATEGORIES_PRODUCTS',
  payload: data
});

/*========== DELETE PRODUCT ============= */

export const deleteProduct = data => ({
  type: 'DELETE_PRODUCT',
  payload: data
});

/*========== EDIT PRODUCT ============= */

export const updateProduct = data => ({
  type: 'UPDATE_PRODUCT',
  payload: data
});

/*========== TOGGLE PRODUCT ============= */

export const toggleEditProductModal = data => ({
  type: 'TOGGLE_EDIT_PRODUCT_MODAL',
  payload: data
});
export const togglePlaceProductModal = data => ({
  type: 'TOGGLE_PLACE_PRODUCT_MODAL',
  payload: data
});

export const toggleDeleteProductModal = data => ({
  type: 'TOGGLE_DELETE_PRODUCT_MODAL',
  payload: data
});
