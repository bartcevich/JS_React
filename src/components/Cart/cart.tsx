import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ButtonPlus from "../../services/ButtonPlus/ButtonPlus";
import ButtonMinus from "../../services/ButtonMinus/buttonMinus";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  selectAllCurrency,
  updateCartStorage,
} from "../../redux/currencySlice";

type currencyState = {
  CartStorage: {};
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

export default function Cart() {
  const [basketEmpty, setBasketEmpty] = useState(false);
  const [menuData, setMenuData] = useState<any[]>([]);
  const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const dispatch = useDispatch<AppDispatch>();
  // const { Quantity }: any = useSelector<RootState, currencyState>(
  //   selectAllCurrency
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts/user/15");
        const data = await response.json();
        console.log(data);
        dispatch(updateCartStorage(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dataForComponent = () => {
    const data: any = ShowProduct.CartStorage;
    const choiceForComponent = data["carts"] || {};
    const values = Object.values(choiceForComponent);
    setMenuData(values);
    // console.log(values);
  };

  const deleteMenuItem = (id: number) => {
    console.log(ShowProduct);
    const updatedMenuData = menuData.map((item) => {
      const updatedProducts = item.products.filter(
        (menuProduct: any) => menuProduct.id !== id
      );
      return { ...item, products: updatedProducts };
    });
    // dispatch(updateCartStorage(data));
    setMenuData(updatedMenuData);
    // console.log(updatedMenuData);
  };

  useEffect(() => {
    // console.log(ShowProduct.CartStorage);
    if (
      typeof ShowProduct.CartStorage === "object" &&
      ShowProduct.CartStorage !== null &&
      Object.keys(ShowProduct.CartStorage).length > 0
    ) {
      setBasketEmpty(true);
      dataForComponent();
    }
  }, [ShowProduct]);

  return (
    <>
      {!basketEmpty ? (
        <div className={styles.wrapper}>
          <h2 className={styles.textH2}>My cart</h2>
          <div className={styles.textH3}>No items</div>
        </div>
      ) : (
        <>
          {menuData.map((menuItem, index) => (
            <div key={index} className={styles.wrapper}>
              <h2 className={styles.textH2}>My cart</h2>
              <div className={styles.twoBlock}>
                <div className={styles.imageContainer}>
                  {menuItem.products.map((menuProduct: any, index: any) => {
                    const discountedPrice =
                      menuProduct.price -
                      (menuProduct.price * menuProduct.discountPercentage) /
                        100;
                    return (
                      <div key={index} className={styles.imageWrapper}>
                        <img
                          src={menuProduct.thumbnail}
                          alt="Image"
                          className={styles.imageProduct}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className={styles.textP}>
                          <div className={styles.totalCount}>
                            {menuProduct.title}
                          </div>
                          <div className={styles.without}>
                            {discountedPrice.toFixed(2)} $
                          </div>
                        </div>
                        <div className={styles.buttonDiv}>
                          <div className={styles.buttonLeft}>
                            <ButtonMinus />
                          </div>
                          <div className={styles.buttonItem}>
                            {menuProduct.quantity}item
                          </div>
                          <div className={styles.buttonRight}>
                            <ButtonPlus />
                          </div>
                          <button
                            className={styles.buttonDelete}
                            onClick={() => deleteMenuItem(menuProduct.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
                    <div className={styles.total2}>
                      {menuItem.discountedTotal}$
                    </div>
                  </div>
                </div>
                <div className={styles.priceContainer}></div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
