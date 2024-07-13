import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

const initialState: currencyState = {
  ShowProduct: {},
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
    updateQuantity: (state, action: PayloadAction<number>) => {
      state.Quantity = action.payload;
    },
    updateEur: (state, action: PayloadAction<number>) => {
      state.EUR = action.payload;
    },
  },
});
// export const selectCurrencyState = (state: RootState): currencyState => state.currencys;
export const selectAllCurrency = (state: RootState): currencyState => state.currencys;
export const { updateShowProduct, updateQuantity, updateEur } = currencySlice.actions;
export default currencySlice.reducer;
