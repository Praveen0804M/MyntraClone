import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        
    },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;