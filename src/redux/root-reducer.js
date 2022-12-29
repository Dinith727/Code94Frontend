import { combineReducers } from 'redux';
import {
  productCreateReducer,
  productDeleteReducer,
  productListReducer,
  productReviewCreateReducer,
  productReviewDeleteReducer,
  productTopRatedReducer,
  productUpdateReducer,
  productStockReducer,
  productProCountReducer,
  productExpenseReducer,
  productExpenseForProdReducer,
} from './reducers/product/product.reducer';
import { productDetailsReducer } from './reducers/productdetails/productdetails.reducer';



const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: productReviewDeleteReducer,
  productTopRated: productTopRatedReducer,
  productStock : productStockReducer,
  productProCount : productProCountReducer,
  productExpense : productExpenseReducer,
  productExpenseForProduct : productExpenseForProdReducer,
});

export default rootReducer;
