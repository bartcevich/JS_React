import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AllBigButton from "../../services/AllBigButton/allBigButton";

export default function LoginData() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataInRedux = (data: any) => {
    if (
      typeof data === "object" &&
      data !== null &&
      Object.keys(data).length > 0
    ) {
      const forToken = { token: data.token };
      localStorage.setItem("dataUser", JSON.stringify(forToken));
    }
    navigate("/");
  };

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

  return (
    <>
      <div className={styles.wrapper1}>
        <h2 className={styles.textH2}>Sign in</h2>
        <div className={styles.borderInput}>
          <input
            className={styles.inputContainer}
            type="text"
            id="username"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.inputContainer}
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.loginButton} onClick={handleLogin}>
            <AllBigButton />
          </button>
        </div>
      </div>
    </>
  );
}
