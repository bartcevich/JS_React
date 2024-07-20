import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  selectAllData,
  updateCartData,
  updateCardID,
  updateFirstName,
  updateLastName,
} from "../../redux/cartSlice";
type cartState = {
  CartData: {};
  CardID: number;
  firstName: string;
  lastName: string;
};

export default function LoginData() {
  const dispatch = useDispatch<AppDispatch>();
  const headerDataUser = useSelector<RootState, cartState>(selectAllData);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   if (headerDataUser.firstName !== "") {
  //     navigate("/");
  //   } else {
  //     console.log("testIf2", headerDataUser.firstName);
  //   }
  // }, [headerDataUser.firstName]);

  const handleLogin = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dataInRedux(data);
      });
  };

  const dataInRedux = (data: any) => {
    if (
      typeof data === "object" &&
      data !== null &&
      Object.keys(data).length > 0
    ) {
      // console.log(data);
      const forToken = { token: data.token };
      localStorage.setItem("dataUser", JSON.stringify(forToken));
      // dispatch(updateCardID(data.id));
      // dispatch(updateFirstName(data.firstName));
      // dispatch(updateLastName(data.lastName));
    }
    checkoutHome();
  };
  // console.log("testIf", headerDataUser.firstName);
  const checkoutHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.loginButton} onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
}
