import styles from "./styles.module.scss";
import Home from "../Home/home";
import Catalog from "../Catalog/catalog";
import FAQ from "../FAQ/faq";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  updateCartData,
  updateCardID,
  updateIDforUpdateCart,
  updateFirstName,
  updateLastName,
  updateTotalProducts,
  updateTotal,
  updateDiscountedTotal,
} from "../../redux/cartSlice";

export default function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const cartUserId = useSelector<RootState, cartState>(selectAllData);

  const currentAuth: any = localStorage.getItem("dataUser");
  let parsedCurrentAuth: any = {};
  if (currentAuth) {
    parsedCurrentAuth = JSON.parse(currentAuth);
  }
  useEffect(() => {
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `${parsedCurrentAuth.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized request");
        }
        return res.json();
      })
      .then((data) => {
        dataInRedux(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, []);

  const fetchData = async (data1: any) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/user/${data1.id}`
      );
      const data = await response.json();
      const carts = data.carts;
      const objectFromArray = carts[0] || {};
      dispatch(updateIDforUpdateCart(objectFromArray.id));
      dispatch(updateTotalProducts(objectFromArray.totalProducts));
      dispatch(updateTotal(objectFromArray.total));
      dispatch(updateDiscountedTotal(objectFromArray.discountedTotal));
      dispatch(updateCartData(objectFromArray.products));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const dataInRedux = (data: any) => {
    if (
      typeof data === "object" &&
      data !== null &&
      Object.keys(data).length > 0
    ) {
      console.log(data);
      dispatch(updateCardID(data.id));
      dispatch(updateFirstName(data.firstName));
      dispatch(updateLastName(data.lastName));
      fetchData(data);
    }
  };

  return (
    <div className={styles.bodyWrapper}>
      <Home />
      <Catalog />
      <FAQ />
    </div>
  );
}
