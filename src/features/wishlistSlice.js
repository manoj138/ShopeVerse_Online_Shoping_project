import { createSlice } from "@reduxjs/toolkit";

const getWishlistItemsFromLocalStorage = () => {
  try {
    let wishlistItems = localStorage.getItem("wishlist");
    return wishlistItems ? JSON.parse(wishlistItems) : [];
  } catch (error) {
    console.error(error.messgae);
  }
};

const setWishListItemsToLocalStorage = (product) => {
  localStorage.setItem("wishlist", JSON.stringify(product));
};

const initialState = {
  wishListItems: getWishlistItemsFromLocalStorage(),
  isLoading: false,
};



const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishList: (state, action) => {
      const  product  = action.payload;

      const exists = state.wishListItems.find((item) => item.id == product.id);

      
      if (!exists) {
        state.wishListItems.push({
          ...product,
        });
      }
      setWishListItemsToLocalStorage(state.wishListItems);
    },

    removeFromWishList: (state, action) => {
      const  product  = action.payload;
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== product
      );

      setWishListItemsToLocalStorage(state.wishListItems);
    },

    clearWishList: (state) => {
      (state.wishListItems = []), (state.isLoading = false);
    
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;