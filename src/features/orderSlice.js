import { createSlice } from "@reduxjs/toolkit";

const getOrdersFromLocalStorage = () => {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
};

const setOrdersToLocalStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const initialState = {
  orders: getOrdersFromLocalStorage(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add the new order to the beginning of the list
      state.orders.unshift(action.payload);
      setOrdersToLocalStorage(state.orders);
    },
    clearOrders: (state) => {
      state.orders = [];
      setOrdersToLocalStorage([]);
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
