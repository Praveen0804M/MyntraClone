import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "./slices/addToCart";
import productsReducer from "./slices/products";

const store = configureStore(
    {
        reducer: {
            products: productsReducer,
            addToCart: addToCartReducer,
            
        }
    }
)

export default store
export type RootState = ReturnType<typeof store.getState>
