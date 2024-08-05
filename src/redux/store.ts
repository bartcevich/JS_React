import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import cartSlice from './cartSlice';

export const store = configureStore({
    reducer: {
        currencys: currencySlice,
        carts: cartSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;