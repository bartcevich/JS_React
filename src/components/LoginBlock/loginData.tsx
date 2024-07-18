import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginData() {
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
        oneShowProduct();
        console.log(data);
      });
  };

  const oneShowProduct = () => {
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
