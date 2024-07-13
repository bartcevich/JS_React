import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import overlayImage from "../../assets/Hover.png";

import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateShowProduct } from "../../redux/currencySlice";

export default function AllPrice() {
  const [allPrice, setAllPrice] = useState({});
  const [menuData, setMenuData] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/search?q=&limit=12&skip=1"
        );
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
    const choiceForComponent = data["products"] || {};
    const values = Object.values(choiceForComponent);
    setMenuData(values);
    // console.log(values);
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

  const onShowProduct = (data: any) => {
    // console.log(data);
    dispatch(updateShowProduct(data));
    navigate(`/product/${data.id}`);
  };

  return (
    <>
      {menuData.map((menuItem, index) => (
        <div
          key={index}
          className={styles.menuItem}
          onClick={() => onShowProduct(menuItem)}
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
                <div className={styles.price}>{menuItem.price} $</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
