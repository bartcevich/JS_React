import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type currencyState = {
  ShowProduct: {};
  USD: number;
  EUR: number;
};

const initialState: currencyState = {
  ShowProduct: {},
  USD: 0,
  EUR: 0,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateShowProduct: (state, action: PayloadAction<{}>) => {
      state.ShowProduct = action.payload;
    },
    updateUsd: (state, action: PayloadAction<number>) => {
      state.USD = action.payload;
    },
    updateEur: (state, action: PayloadAction<number>) => {
      state.EUR = action.payload;
    },
  },
});
// export const selectCurrencyState = (state: RootState): currencyState => state.currencys;
export const selectAllCurrency = (state: RootState): currencyState => state.currencys;
export const { updateShowProduct, updateUsd, updateEur } = currencySlice.actions;
export default currencySlice.reducer;
