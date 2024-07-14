import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import overlayImage from "../../assets/Hover.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  selectAllCurrency,
  updateShowProduct,
} from "../../redux/currencySlice";
import ButtonPlus from "../../services/ButtonPlus/ButtonPlus";
import ButtonMinus from "../../services/ButtonMinus/buttonMinus";
import ButtonCart from "../../services/ButtonCart/buttonCart";

type currencyState = {
  ShowProduct: {};
  Quantity: number;
  EUR: number;
};

const AllPrice = (props: any) => {
  // const [allPrice, setAllPrice] = useState({});
  const [menuData, setMenuData] = useState<any[]>([]);
  const navigate = useNavigate();
  const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const dispatch = useDispatch<AppDispatch>();

  const savingData = (data: any) => {
    const choiceForComponent = data["products"] || {};
    const values = Object.values(choiceForComponent);
    const mergedArray = [...menuData, ...values];
    setMenuData(mergedArray);
    console.log("f3", data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=&limit=12&skip=${props.quantity}`
        );
        const data = await response.json();
        // setAllPrice(data);
        savingData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.quantity]);

  const oneShowProduct = (data: any) => {
    // console.log(data);
    dispatch(updateShowProduct(data));
    navigate(`/product/${data.id}`);
  };

  const onButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent event propagation
    // Add your button click logic here
  };

  return (
    <>
      {menuData.map((menuItem, index) => {
        const discountedPrice =
          menuItem.price - (menuItem.price * menuItem.discountPercentage) / 100;
        return (
          <div
            key={index}
            className={styles.menuItem}
            onClick={() => oneShowProduct(menuItem)}
          >
            <div className={styles.wrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={menuItem.thumbnail}
                  alt="Image"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.hoverContent}>
                  <img src={overlayImage} alt="Image" />
                </div>
              </div>
              <div className={styles.description}>
                <div className={styles.label}>
                  <div className={styles.name}>{menuItem.title}</div>
                  <div className={styles.price}>
                    {discountedPrice.toFixed(2)} $
                  </div>
                </div>
                <div className={styles.buttonContainer} onClick={onButtonClick}>
                  {ShowProduct.Quantity === 0 ? (
                    <div className={styles.buttonRight}>
                      <ButtonCart />
                    </div>
                  ) : (
                    <div className={styles.buttonContainer}>
                      <div className={styles.buttonLeft}>
                        <ButtonMinus />
                      </div>
                      {ShowProduct.Quantity} item
                      <div className={styles.buttonRight}>
                        <ButtonPlus />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default AllPrice;
