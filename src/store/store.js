import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productSlice from "../features/productSlice"
import wishlistSlice from "../features/wishlistSlice"
import cartSlice from "../features/cartSlice"
import orderSlice from "../features/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    order: orderSlice,
  }


});
