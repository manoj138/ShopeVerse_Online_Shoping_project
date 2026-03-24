import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const setCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
  cartItems: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }

      setCartToLocalStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      setCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      setCartToLocalStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
