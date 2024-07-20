import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonCartImg from "../../assets/ButtonCartImg.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency, updateEur } from "../../redux/currencySlice";
import { selectAllData, updateCartData } from "../../redux/cartSlice";
type cartState = {
  CartData: any[];
};
type currencyState = {
  ShowProduct: {};
  // CartStorage: {};
  // Quantity: number;
  EUR: number;
};

export default function UpdateCard() {
  const [allPrice, setAllPrice] = useState<any[]>([]);
  // const [hasAddedItem, setHasAddedItem] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartUser = useSelector<RootState, cartState>(selectAllData);
  const addItem = useSelector<RootState, currencyState>(selectAllCurrency);

  const newItemInCart = () => {
    const cart: any[] = cartUser.CartData || [];
    const newProducts: any = addItem.ShowProduct || {};
    setAllPrice(cart);
    setAllPrice((prevAllPrice) => [...prevAllPrice, newProducts]);
    console.log(addItem.EUR, allPrice);
    dispatch(updateCartData(allPrice));
    dispatch(updateEur(0));
  };
  console.log("allPriceState", allPrice);

  const onIncrementQuantity = () => {
    // const data: any = cartUser.CartData || [];
    // const objectFromArray = data[0] || {};
    // const products = objectFromArray.products;
    // setAllPrice(products);
    // console.log(products);
    // fetch("https://dummyjson.com/carts/1", {
    //   method: "PUT" /* or PATCH */,
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     merge: true, // this will include existing products in the cart
    //     products: [
    //       {
    //         id: 11,
    //         quantity: 1,
    //       },
    //     ],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
  };

  useEffect(() => {
    if (addItem.EUR === 1) {
      newItemInCart();
    }
  }, [addItem.EUR]);

  return <></>;
}
