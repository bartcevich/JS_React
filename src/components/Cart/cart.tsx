import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency } from "../../redux/currencySlice";

type currencyState = {
  ShowProduct: {};
};

export default function Cart() {
  // const { id } = useParams<{ id: string }>();
  // const data = useSelector((state: RootState) => state.currencys.ShowProduct);
  // const [menuData, setMenuData] = useState<any[]>([]);
  // const dispatch = useDispatch<AppDispatch>();
  // const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);

  // useEffect(() => {
  //   // const choiceForComponent = ShowProduct.ShowProduct || {};
  //   const values = [ShowProduct];
  //   setMenuData(values);
  // }, []);
  // console.log(menuData);
  return <></>;
}
