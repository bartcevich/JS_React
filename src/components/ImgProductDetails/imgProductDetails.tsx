import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";

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

export default function ImgProductDetails() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const ShowProduct = useSelector<RootState, currencyState>(selectAllCurrency);
  const ShowProduct2 = useSelector<RootState, cartState>(selectAllData);

  useEffect(() => {
    const choiceForComponent = ShowProduct2.ShowProduct2 || {};
    const values = [choiceForComponent];
    setMenuData(values);
    console.log(values);
  }, []);

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      {menuData.map((menuItem, id) => (
        <div key={id} className={styles.imageWrapper}>
          <img
            src={menuItem.images[selectedImageIndex]}
            alt="Image"
            className={styles.imageProduct}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.scrollContainer}>
            {/* <img
              src={menuItem.thumbnail}
              alt="Image"
              className={styles.scrollPhoto}
              loading="lazy"
              decoding="async"
            /> */}
            {menuItem.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt="Image"
                className={`${styles.scrollPhoto} ${
                  index === selectedImageIndex ? styles.active : ""
                }`}
                loading="lazy"
                decoding="async"
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
