import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICart, IProduct } from "../../types";

export interface ICartItem {
  product: ICart;
  quantity: number;
  _id?: string;
}

interface IProductState {
  wishlists: IProduct[];
  cart: ICartItem[];
  color: string | null
}

const initialState: IProductState = {
  wishlists: [],
  cart: [],
  color: null
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlists = [action.payload, ...state.wishlists];
    },

    removeFromWishlist: (state, action) => {
      state.wishlists = state.wishlists.filter(
        (item: IProduct) => item._id !== action.payload._id
      );
    },

    setWishlists: (state, action: PayloadAction<IProduct[]>) => {
      state.wishlists = action.payload;
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

    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cart = action.payload;
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: ICartItem) => item.product._id !== action.payload.id
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

    removeAllFromCart: (state) => {
      state.cart = [];
    }
  },
});

export const ProductState = (state: RootState) => state.product;

export const {
  setColor,
  addToWishlist,
  removeFromWishlist,
  setWishlists,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
  removeAllFromCart
} = productSlice.actions;

export default productSlice.reducer;
