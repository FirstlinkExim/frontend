import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { lookInInLocalStorage } from "@/config/localstorage";

interface IFilterState {
  view: string;
  category: string;
  color: string;
  size: string;
  price: string;
  type: string;
  sort: string;
}

const initialState: IFilterState = {
  view: "grid",
  category: "",
  color: "",
  price: "",
  size: "",
  type: "",
  sort: "Date added, newest to oldest",
};

const filterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },

    setSize: (state, action) => {
      state.size = action.payload;
    },

    setColor: (state, action) => {
      state.color = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },

    setPrice: (state, action) => {
      state.price = action.payload;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },

    reset: () => initialState,
  },
});

export const FilterState = (state: RootState) => state.filter;

export const {
  reset,
  setView,
  setCategory,
  setColor,
  setPrice,
  setSize,
  setType,
  setSort
} = filterSlice.actions;

export default filterSlice.reducer;
