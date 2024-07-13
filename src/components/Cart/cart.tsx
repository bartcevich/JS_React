import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ButtonPlus from "../../services/ButtonPlus/ButtonPlus";
import ButtonMinus from "../../services/ButtonMinus/buttonMinus";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllCurrency } from "../../redux/currencySlice";

type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

export default function Cart() {
  const [allPrice, setAllPrice] = useState({});
  const [menuData, setMenuData] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const { Quantity }: any = useSelector<RootState, currencyState>(
    selectAllCurrency
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts/user/15");
        const data = await response.json();
        setAllPrice(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dataForComponent = () => {
    const data: any = allPrice;
    const choiceForComponent = data["carts"] || {};
    const values = Object.values(choiceForComponent);
    setMenuData(values);
    console.log(values);
  };

  useEffect(() => {
    if (
      typeof allPrice === "object" &&
      allPrice !== null &&
      Object.keys(allPrice).length > 0
    ) {
      dataForComponent();
    }
  }, [allPrice]);
  return (
    <>
      {menuData.map((menuItem, index) => (
        <div key={index} className={styles.wrapper}>
          <h2 className={styles.textH2}>My cart</h2>
          <div className={styles.twoBlock}>
            <div className={styles.imageContainer}>
              {menuItem.products.map((menuProduct: any, index: any) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={menuProduct.thumbnail}
                    alt="Image"
                    className={styles.imageProduct}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.textP}>
                    <div className={styles.totalCount}>{menuProduct.title}</div>
                    <div className={styles.without}>{menuProduct.price} $</div>
                  </div>
                  <div className={styles.buttonDiv}>
                    <div className={styles.buttonLeft}>
                      <ButtonMinus />
                    </div>
                    <div className={styles.buttonItem}>
                      {ShowProduct.Quantity} item
                    </div>
                    <div className={styles.buttonRight}>
                      <ButtonPlus />
                    </div>
                    <button className={styles.buttonDelete}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.info}>
              <div className={styles.textPrice}>
                <div className={styles.totalCount}>Total count</div>
                <div className={styles.totalCount2}>
                  {menuItem.totalProducts} items
                </div>
              </div>
              <div className={styles.textPrice}>
                <div className={styles.without}>Price without discount</div>
                <div className={styles.without2}>{menuItem.total}$</div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.textPrice}>
                <div className={styles.total}>Total price</div>
                <div className={styles.total2}>{menuItem.discountedTotal}$</div>
              </div>
            </div>
            <div className={styles.priceContainer}></div>
          </div>
        </div>
      ))}
    </>
  );
}
