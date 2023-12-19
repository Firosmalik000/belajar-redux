import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      const selectItem = state.items.find((item) => item.id === itemId.id);
      if (selectItem) {
        selectItem.qty += 1;
      } else {
        state.items.push({ ...itemId, qty: 1 });
      }
    },
    removeCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    increaseCart: (state, action) => {
      const itemId = action.payload;
      const selectItem = state.items.find((item) => item.id === itemId);
      if (selectItem) {
        selectItem.qty += 1;
      }
    },
    decreaseCart: (state, action) => {
      const itemId = action.payload;
      const selectItem = state.items.find((item) => item.id === itemId);
      if (selectItem) {
        selectItem.qty -= 1;
        if (selectItem.qty < 1) {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeCart, clearCart, increaseCart, decreaseCart } = cartSlice.actions;

export default cartSlice.reducer;
