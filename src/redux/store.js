import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        orders: orderReducer
    },
});
