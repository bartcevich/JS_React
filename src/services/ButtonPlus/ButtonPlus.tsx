import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonPlusImg from "../../assets/ButtonPlus.png";

export default function ButtonPlus() {
  return (
    // <button className={styles.buttonImg} onClick={onIncrementQuantity}>
    <img src={ButtonPlusImg} alt="Button Plus" />
    // </button>
  );
}
