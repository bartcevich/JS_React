import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type currencyState = {
  ShowProduct: {};
  CartStorage: {};
  Quantity: number;
  EUR: number;
};

const initialState: currencyState = {
  ShowProduct: {},
  CartStorage: {},
  Quantity: 0,
  EUR: 0,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateShowProduct: (state, action: PayloadAction<{}>) => {
      state.ShowProduct = action.payload;
    },
    updateCartStorage: (state, action: PayloadAction<{}>) => {
      state.CartStorage = action.payload;
    },
    updateQuantity: (state, action: PayloadAction<number>) => {
      state.Quantity = action.payload;
    },
    updateEur: (state, action: PayloadAction<number>) => {
      state.EUR = action.payload;
    },
  },
});
export const selectAllCurrency = (state: RootState): currencyState => state.currencys;
export const { updateShowProduct, updateCartStorage, updateQuantity, updateEur } = currencySlice.actions;
export default currencySlice.reducer;
