import { PURGE } from 'redux-persist';

let initialState = {
  allProducts: [],
  hotProducts: [],
  topItemsPurchaseGraph: null,
  salesByGenderGraph: null,
  salesByAgeGroupGraph: null,
  topItemsPurchaseByGenderGraph: null,
  topCategoriesPurchaseByGenderGraph: null,
  salesByAreaGraph: null,
  leastItemsPurchaseGraph: null,
  topCategoriesPurchaseGraph: null,
  leastCategoriesPurchaseGraph: null,
  categoriesSalesByMonthGraph: null,
  topItemsPurchaseByCategoryGraph: null,
  leastItemsPurchaseByCategoryGraph: null,
  topItemsPurchaseSubCategoryGraph: null,
  leastItemsPurchaseSubCategoryGraph: null,
  productCategories: [],
  productQuantity: null,
  categoriesProducts: [],
  isEditProductModal: false,
  isAddProductModal: false,
  isPlaceProductModal: false,
  fetching: true,
  isDeleteProductModal: false
};

const Product = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE:
      return initialState;

    /*========== PRODUCT REDUCERS ============= */

    case 'SET_ALL_PRODUCTS':
      return {
        ...state,
        fetching: false,
        allProducts: payload.data,
        count: payload.count
      };

    case 'GET_ALL_PRODUCTS_PENDING':
      return {
        ...state,
        fetching: true
      };

    case 'SET_HOT_PRODUCTS':
      return {
        ...state,
        hotProducts: payload.data
      };

    case 'SET_TOP_ITEMS_PURCHASE_GRAPH':
      return {
        ...state,
        topItemsPurchaseGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_SALES_BY_GENDER_GRAPH':
      return {
        ...state,
        salesByGenderGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_SALES_BY_AGE_GROUP_GRAPH':
      return {
        ...state,
        salesByAgeGroupGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_LEAST_ITEMS_PURCHASE_GRAPH':
      return {
        ...state,
        leastItemsPurchaseGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_TOP_CATEGORIES_PURCHASE_GRAPH':
      return {
        ...state,
        topCategoriesPurchaseGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_LEAST_CATEGORIES_PURCHASE_GRAPH':
      return {
        ...state,
        leastCategoriesPurchaseGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_CATEGORIES_SALES_BY_MONTH_GRAPH':
      return {
        ...state,
        categoriesSalesByMonthGraph: {
          graph: payload.graph,
        }
      };

    case 'SET_TOP_ITEMS_PURCHASE_BY_CATEGORY_GRAPH':
      return {
        ...state,
        topItemsPurchaseByCategoryGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_LEAST_ITEMS_PURCHASE_BY_CATEGORY_GRAPH':
      return {
        ...state,
        leastItemsPurchaseByCategoryGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_TOP_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH':
      return {
        ...state,
        topItemsPurchaseSubCategoryGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_LEAST_ITEMS_PURCHASE_SUB_CATEGORY_GRAPH':
      return {
        ...state,
        leastItemsPurchaseSubCategoryGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_TOP_ITEMS_PURCHASE_BY_GENDER_GRAPH':
      return {
        ...state,
        topItemsPurchaseByGenderGraph: {
          graph: payload.updatedGroupedProducts,
        }
      };

    case 'SET_TOP_CATEGORIES_PURCHASE_BY_GENDER_GRAPH':
    return {
        ...state,
        topCategoriesPurchaseByGenderGraph: {
          graph: payload.updatedGroupedProducts,
        }
      };
    case 'SET_SALES_BY_AREA_GRAPH':
      return {
        ...state,
        salesByAreaGraph: {
          graph: payload.chartData,
        }
      };

    case 'SET_PRODUCT_QUANTITY':
      return {
        ...state,
        productQuantity: payload.data
      };

    case 'SET_PRODUCT_CATEGORIES':
      return {
        ...state,
        productCategories: payload
      };

    case 'SET_CATEGORIES_PRODUCTS':
      return {
        ...state,
        categoriesProducts: payload
      };

    case 'TOGGLE_ADD_PRODUCT_MODAL':
      return {
        ...state,
        isAddProductModal: payload
      };

    case 'TOGGLE_EDIT_PRODUCT_MODAL':
      return {
        ...state,
        isEditProductModal: payload
      };

    case 'TOGGLE_PLACE_PRODUCT_MODAL':
      return {
        ...state,
        isPlaceProductModal: payload
      };

    case 'TOGGLE_DELETE_PRODUCT_MODAL':
      return {
        ...state,
        isDeleteProductModal: payload
      };

    default:
      return state;
  }
};

export default Product;
