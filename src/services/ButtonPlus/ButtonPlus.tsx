import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonPlusImg from "../../assets/ButtonPlus.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency, updateQuantity } from "../../redux/currencySlice";

type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

export default function ButtonPlus() {
  const dispatch = useDispatch<AppDispatch>();
  const { Quantity }: any = useSelector<RootState, currencyState>(
    selectAllCurrency
  );

  const onIncrementQuantity = () => {
    dispatch(updateQuantity(Quantity + 1));
  };

  return (
    <button className={styles.buttonImg} onClick={onIncrementQuantity}>
      <img src={ButtonPlusImg} alt="Button Plus" />
    </button>
  );
}
