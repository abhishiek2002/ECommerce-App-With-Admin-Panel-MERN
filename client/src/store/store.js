import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductReducer from "./admin/productSlice"
import shopProductReducer from "./shop/products-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer
  },
});

export default store;
