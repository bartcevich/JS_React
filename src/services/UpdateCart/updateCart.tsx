import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonCartImg from "../../assets/ButtonCartImg.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency, updateEur } from "../../redux/currencySlice";
type currencyState = {
  ShowProduct: {};
  EUR: number;
};
import {
  selectAllData,
  updateCartData,
  updateCardID,
  updateIDforUpdateCart,
  updateFirstName,
  updateLastName,
  updateTotalProducts,
  updateTotal,
  updateDiscountedTotal,
} from "../../redux/cartSlice";
type cartState = {
  CartData: any[];
  CardID: number;
  IDforUpdateCart: number;
  totalProducts: number;
};

export default function UpdateCard() {
  const [allPrice, setAllPrice] = useState<any[]>([]);
  // const [hasAddedItem, setHasAddedItem] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartUser = useSelector<RootState, cartState>(selectAllData);
  const addItem = useSelector<RootState, currencyState>(selectAllCurrency);

  const requestToServer = () => {
    const newProducts: any = addItem.ShowProduct || {};
    setAllPrice((prevAllPrice) => [...prevAllPrice, newProducts]);
    dispatch(updateEur(0));
    console.log("allPriceState", allPrice, newProducts);
    setAllPrice([]);
    // console.log(products);
  };

  const newItemInCart = () => {
    const cart: any[] = [];
    // cartUser.CartData || [];
    const newProducts: any = addItem.ShowProduct || {};
    let arrayAndObject = [];
    arrayAndObject = [...cart, newProducts];
    dispatch(updateEur(0));
    // let numberInCart = cartUser.totalProducts + 1;
    // dispatch(updateTotalProducts(numberInCart));
    //
    console.log("allPriceState", arrayAndObject, newProducts);
    //
    fetch(`https://dummyjson.com/carts/${cartUser.IDforUpdateCart}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true, // this will include existing products in the cart
        products: arrayAndObject,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateIDforUpdateCart(data.id));
        dispatch(updateTotalProducts(data.totalProducts));
        dispatch(updateTotal(data.total));
        dispatch(updateDiscountedTotal(data.discountedTotal));
        dispatch(updateCartData(data.products));
        console.log(data);
      });
    // .then(console.log);
  };

  useEffect(() => {
    if (addItem.EUR === 1) {
      newItemInCart();
    }
  }, [addItem.EUR, addItem.ShowProduct]);

  return <></>;
}
