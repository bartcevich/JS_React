import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency } from "../../redux/currencySlice";

type currencyState = {
  ShowProduct: {};
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const data = useSelector((state: RootState) => state.currencys.ShowProduct);
  const [menuData, setMenuData] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);

  useEffect(() => {
    const choiceForComponent = ShowProduct.ShowProduct || {};
    const values = [choiceForComponent];
    setMenuData(values);
    console.log(values);
  }, []);

  return (
    <>
      {menuData.map((menuItem, index) => (
        <div key={index} className={styles.wrapper}>
          <div className={styles.imageContainer}>
            <img
              src={menuItem.thumbnail}
              alt="Image"
              className={styles.imageProduct}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.titleContainer}>
              <p className={styles.title}>{menuItem.title}</p>
              <div className={styles.meta}>
                <div className={styles.rating}>{menuItem.rating}</div>
                <p className={styles.selfie}>electronics, selfie accessories</p>
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
                <div className={styles.priceEnd}>{menuItem.price} $</div>
                <div className={styles.priceStart}>0 $</div>
              </div>
              <div className={styles.discount}>
                Your discount: {menuItem.discountPercentage}%
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>Add to cart</button>
              </div>
              {/* <p>Product ID: {id}</p> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
