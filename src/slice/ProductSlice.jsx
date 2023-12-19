import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('product/getProduct', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});
export const getDetailProduct = createAsyncThunk('product/getDetailProduct', async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
});

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: 'product',
  initialState: productEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        productEntity.setAll(state, action.payload);
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        productEntity.setOne(state, action.payload);
      });
  },
});

export const productSelector = productEntity.getSelectors((state) => state.product);

export default productSlice.reducer;
