import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type cartState = {
  CartData: {};
  CardID: number;
  firstName:string;
  lastName:string;
};

const initialState: cartState = {
  CartData: {},
  CardID: -5,
  firstName: "",
  lastName: "",
  
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartData: (state, action: PayloadAction<{}>) => {
      state.CartData = action.payload;
    },
    updateCardID: (state, action: PayloadAction<number>) => {
      state.CardID = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});
// export const selectCurrencyState = (state: RootState): currencyState => state.currencys;
export const selectAllData = (state: RootState): cartState => state.carts;
export const { updateCartData, updateCardID, updateFirstName, updateLastName } = cartSlice.actions;
export default cartSlice.reducer;