import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [] as any[]
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      // console.log("26 -- incrementQuantity - ", action.payload);
      const itemToUpdate = state.cart.find((item) => item.id === action.payload);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      // console.log("33 -- decrementQuantity - ", action.payload);
      const itemToUpdate = state.cart.find((item) => item.id === action.payload);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      } else if (itemToUpdate && itemToUpdate.quantity === 1) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },
  }
});

export default addToCartSlice.reducer;
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = addToCartSlice.actions;