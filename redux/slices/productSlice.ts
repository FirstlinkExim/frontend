import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "../../types";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface IProductState {
  wishlists: IProduct[];
  cart: ICartItem[];
}

const initialState: IProductState = {
  wishlists: [],
  cart: [],
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlists = [action.payload, ...state.wishlists];
    },

    removeFromWishlist: (state, action) => {
      console.log(action.payload);

      state.wishlists = state.wishlists.filter(
        (item: IProduct) => item._id !== action.payload._id
      );
    },

    addToCart: (state, action) => {
      const existingCartItem = state.cart.find(
        (item: ICartItem) => item.product._id === action.payload._id
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cart = [{ product: action.payload, quantity: 1 }, ...state.cart];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: ICartItem) => item.product._id !== action.payload._id
      );
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload.id;
      const existingCartItem = state.cart.find(
        (item: ICartItem) => item.product._id === productId
      );

      if (existingCartItem) {
        if (existingCartItem.quantity < existingCartItem.product.stock) {
          existingCartItem.quantity += 1;
        }
      }
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload.id;
      const existingCartItem = state.cart.find(
        (item: ICartItem) => item.product._id === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity -= 1;
        if (existingCartItem.quantity === 0) {
          state.cart = state.cart.filter(
            (item) => item.product._id !== productId
          );
        }
      }
    },
  },
});

export const ProductState = (state: RootState) => state.product;

export const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = productSlice.actions;

export default productSlice.reducer;
