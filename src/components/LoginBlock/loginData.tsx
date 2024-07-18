import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  selectAllData,
  updateCartData,
  updateCardID,
  updateFirstName,
  updateLastName,
} from "../../redux/cartSlice";

export default function LoginData() {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(updateCartData({}));
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        localStorage.setItem("dataUser", JSON.stringify(data));
        dataInRedux(data); //save in state
      });
  };

  const dataInRedux = (data: any) => {
    // let parsedCurrentAuth: any = {};
    if (
      typeof data === "object" &&
      data !== null &&
      Object.keys(data).length > 0
    ) {
      // parsedCurrentAuth = data;
      console.log(data.id);
    }
    dispatch(updateCardID(data.id));
    dispatch(updateFirstName(data.firstName));
    dispatch(updateLastName(data.lastName));
    // localStorage.setItem("dataUser", JSON.stringify(parsedCurrentAuth.token));
    checkoutHome();
  };

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
