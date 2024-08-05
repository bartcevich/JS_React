import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type cartState = {
  CartData: any[];
  ShowProduct2: {};
  CardID: number;//=userId
  IDforUpdateCart: number;
  numberUnits: number;
  totalProducts: number;
  total: number;
  discountedTotal: number;
  firstName:string;
  lastName:string;
};

const initialState: cartState = {
  CartData: [],
  ShowProduct2: {},
  CardID: -5,
  IDforUpdateCart: 11,
  numberUnits: 0,
  totalProducts: 0,
  total: 0,
  discountedTotal: 0,
  firstName: "",
  lastName: "",
  
};

export const cartSlice = createSlice({

  name: "cart",
  initialState,
  reducers: {
    updateCartData: (state, action: PayloadAction<any[]>) => {

      state.CartData = action.payload;
    },
    updateShowProduct2: (state, action: PayloadAction<{}>) => {
      state.ShowProduct2 = action.payload;
    },
    updateCardID: (state, action: PayloadAction<number>) => {
      state.CardID = action.payload;
    },
    updateIDforUpdateCart: (state, action: PayloadAction<number>) => {
      state.IDforUpdateCart = action.payload;
    },
    updateNumberUnits: (state, action: PayloadAction<number>) => {
      state.numberUnits = action.payload;
    },
    updateTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
    updateTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    updateDiscountedTotal: (state, action: PayloadAction<number>) => {
      state.discountedTotal = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
  },
});
export const selectAllData = (state: RootState): cartState => state.carts;
export const { updateCartData, updateShowProduct2, updateCardID, updateIDforUpdateCart, updateNumberUnits, updateTotalProducts, updateTotal, updateDiscountedTotal, updateFirstName, updateLastName } = cartSlice.actions;
export default cartSlice.reducer;