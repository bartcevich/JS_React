import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonPlusImg from "../../assets/ButtonMinus.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency, updateQuantity } from "../../redux/currencySlice";

type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

export default function AllBigButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { Quantity }: any = useSelector<RootState, currencyState>(
    selectAllCurrency
  );

  const onIncrementQuantity = () => {
    dispatch(updateQuantity(Quantity > 0 ? Quantity - 1 : 0));
  };

  return <div className={styles.buttonImg}>Sign in</div>;
}
