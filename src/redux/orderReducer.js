import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    placeOrder: (state, action) => {
      state.push({
        id: new Date().getTime(),
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        date: new Date().toLocaleString(),
      });
    },
    clearOrders: (state) => {
      return [];
    }
  }
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
