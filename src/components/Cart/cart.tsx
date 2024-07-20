import styles from "./styles.module.scss";
// import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ButtonPlus from "../../services/ButtonPlus/ButtonPlus";
import ButtonMinus from "../../services/ButtonMinus/buttonMinus";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllData } from "../../redux/cartSlice";
type cartState = {
  CartData: any[];
  ShowProduct2: {};
  CardID: number;
  numberUnits: number;
  totalProducts: number;
  total: number;
  discountedTotal: number;
  firstName: string;
  lastName: string;
};

export default function Cart() {
  const [basketEmpty, setBasketEmpty] = useState(false);
  const [menuData, setMenuData] = useState<any[]>([]);
  // const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const ShowProduct2 = useSelector<RootState, cartState>(selectAllData);
  const dispatch = useDispatch<AppDispatch>();
  // const { Quantity }: any = useSelector<RootState, currencyState>(
  //   selectAllCurrency
  // );

  const dataFromCartSlice = () => {
    // const data: any = ;
    // const objectFromArray = data[0] || {};
    // const values = Object.values(objectFromArray);
    setMenuData(ShowProduct2.CartData);
    console.log("CartData", ShowProduct2.CartData);
  };

  const deleteMenuItem = (id: number) => {
    const updatedMenuData = menuData.map((item) => {
      const updatedProducts = item.products.filter(
        (menuProduct: any) => menuProduct.id !== id
      );
      return { ...item, products: updatedProducts };
    });
    // dispatch(updateCartStorage(data));
    setMenuData(updatedMenuData);
  };

  useEffect(() => {
    if (ShowProduct2.CartData.length > 0) {
      setBasketEmpty(true);
      dataFromCartSlice();
    }
  }, [ShowProduct2]);

  return (
    <>
      {!basketEmpty ? (
        <div className={styles.wrapper}>
          <h2 className={styles.textH2}>My cart</h2>
          <div className={styles.textH3}>No items</div>
        </div>
      ) : (
        <>
          <div className={styles.wrapper}>
            <h2 className={styles.textH2}>My cart</h2>
            <div className={styles.twoBlock}>
              <div className={styles.imageContainer}>
                {menuData.map((menuProduct: any, index: any) => {
                  const discountedPrice =
                    menuProduct.price -
                    (menuProduct.price * menuProduct.discountPercentage) / 100;
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
                    {ShowProduct2.totalProducts} items
                  </div>
                </div>
                <div className={styles.textPrice}>
                  <div className={styles.without}>Price without discount</div>
                  <div className={styles.without2}>{ShowProduct2.total}$</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.textPrice}>
                  <div className={styles.total}>Total price</div>
                  <div className={styles.total2}>
                    {ShowProduct2.discountedTotal}$
                  </div>
                </div>
              </div>
              <div className={styles.priceContainer}></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
