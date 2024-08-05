import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllData, updateCartData } from "../../redux/cartSlice";

type cartState = {
  CartData: {};
  CardID: number;
  numberUnits: number;
  firstName: string;
  lastName: string;
};

export default function NumberUnits() {
  const [howManyProducts, setHowManyProducts] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector<RootState, cartState>(selectAllData);

  const dataFromCartSlice = () => {
    const data: any = cart.CartData;
    data.map((item: any) => {
      // console.log(item.totalProducts);
      setHowManyProducts(item.totalProducts);
      // return item;
    });
  };

  useEffect(() => {
    if (
      typeof cart.CartData === "object" &&
      cart.CartData !== null &&
      Object.keys(cart.CartData).length > 0
    ) {
      dataFromCartSlice();
    }
  }, [cart]);

  return <div>{howManyProducts}</div>;
}
