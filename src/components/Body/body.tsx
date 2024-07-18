import styles from "./styles.module.scss";
import Home from "../Home/home";
import Catalog from "../Catalog/catalog";
import FAQ from "../FAQ/faq";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllData, updateCartData } from "../../redux/cartSlice";

type cartState = {
  CartData: {};
  CardID: number;
  firstName: string;
  lastName: string;
};

export default function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartUserId = useSelector<RootState, cartState>(selectAllData);

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
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/carts/user/${cartUserId.CardID}`
        );
        const data = await response.json();
        console.log(data["carts"]);
        dispatch(updateCartData(data["carts"]));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      <Home />
      <Catalog />
      <FAQ />
    </div>
  );
}
