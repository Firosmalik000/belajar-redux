import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slice/ProductSlice';
import cartReducer from '../slice/CartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
