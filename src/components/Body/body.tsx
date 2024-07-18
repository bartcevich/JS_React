import styles from "./styles.module.scss";
import Home from "../Home/home";
import Catalog from "../Catalog/catalog";
import FAQ from "../FAQ/faq";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Body() {
  const navigate = useNavigate();

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        navigate("/login");
      });
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      <Home />
      <Catalog />
      <FAQ />
    </div>
  );
}
