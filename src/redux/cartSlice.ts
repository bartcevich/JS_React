import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type cartState = {
  CartData: {};
};

const initialState: cartState = {
  CartData: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartData: (state, action: PayloadAction<{}>) => {
      state.CartData = action.payload;
    },
  },
});
// export const selectCurrencyState = (state: RootState): currencyState => state.currencys;
export const selectAllData = (state: RootState): cartState => state.carts;
export const { updateCartData } = cartSlice.actions;
export default cartSlice.reducer;