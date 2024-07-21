import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ButtonPlus from "../../services/ButtonPlus/ButtonPlus";
import ButtonMinus from "../../services/ButtonMinus/buttonMinus";
import StarRed from "../../assets/StarRed.svg";
import Star from "../../assets/Star.svg";
import ImgProductDetails from "../ImgProductDetails/imgProductDetails";
import UpdateCard from "../../services/UpdateCart/updateCart";

import {
  selectAllCurrency,
  updateQuantity,
  updateEur,
} from "../../redux/currencySlice";
type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllData } from "../../redux/cartSlice";
type cartState = {
  CartData: {};
  ShowProduct2: {};
  CardID: number;
  numberUnits: number;
  firstName: string;
  lastName: string;
};

export default function ProductDetails() {
  // const { id2 } = useParams<{ id: string }>();
  const data = useSelector((state: RootState) => state.currencys.ShowProduct);
  const [menuData, setMenuData] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const ShowProduct2 = useSelector<RootState, cartState>(selectAllData);
  const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const { Quantity }: any = useSelector<RootState, currencyState>(
    selectAllCurrency
  );

  useEffect(() => {
    const choiceForComponent = ShowProduct2.ShowProduct2 || {};
    const values = [choiceForComponent];
    setMenuData(values);
    console.log(ShowProduct2.ShowProduct2);
  }, []);

  const onIncrementQuantity = () => {
    dispatch(updateQuantity(Quantity + 1));
    dispatch(updateEur(1));
    console.log("big", ShowProduct.ShowProduct);
  };

  const onButtonClick = () => {
    dispatch(updateEur(1));
    console.log("small", ShowProduct.ShowProduct);
  };

  return (
    <>
      {menuData.map((menuItem, id) => {
        const discountedPrice =
          menuItem.price - (menuItem.price * menuItem.discountPercentage) / 100;
        const rating = Math.round(menuItem.rating);
        const redStars = Array(rating).fill(
          <div className={styles.redStar}>
            <img src={StarRed} alt="StarRed" />
          </div>
        );
        const yellowStars = Array(5 - rating).fill(
          <div className={styles.yellowStar}>
            <img src={Star} alt="Star" />
          </div>
        );
        return (
          <div key={id} className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <ImgProductDetails />
            </div>
            <div className={styles.info}>
              <div className={styles.titleContainer}>
                <p className={styles.title}>{menuItem.title}</p>
                <div className={styles.meta}>
                  <div className={styles.rating}>
                    {redStars}
                    {yellowStars}
                  </div>
                  <div className={styles.tag}>
                    {menuItem.tags.map((tag: string, i: number) => (
                      <p key={i} className={styles.selfie}>
                        {tag},
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.stock}>
                In Stock - Only {menuItem.stock} left!
              </p>
              <p className={styles.selfie}>{menuItem.description}</p>
              <p className={styles.warranty}>{menuItem.warrantyInformation}</p>
              <p className={styles.shipping}>{menuItem.shippingInformation}</p>
              <div className={styles.priceContainer}>
                <div className={styles.price}>
                  <div className={styles.priceEnd}>
                    {discountedPrice.toFixed(2)} $
                  </div>
                  <div className={styles.priceStart}>{menuItem.price} $</div>
                </div>
                <div className={styles.discount}>
                  Your discount: {menuItem.discountPercentage}%
                </div>
                <div className={styles.buttonContainer}>
                  {ShowProduct.Quantity === 0 ? (
                    <button
                      className={styles.button}
                      onClick={onIncrementQuantity}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <div className={styles.buttonContainer}>
                      <div className={styles.buttonLeft}>
                        <ButtonMinus />
                      </div>
                      {ShowProduct.Quantity} item
                      <div
                        className={styles.buttonRight}
                        onClick={() => onButtonClick()}
                      >
                        <ButtonPlus />
                      </div>
                    </div>
                  )}
                </div>
                {/* <p>Product ID: {id}</p> */}
              </div>
            </div>
          </div>
        );
      })}
      <UpdateCard />
    </>
  );
}
