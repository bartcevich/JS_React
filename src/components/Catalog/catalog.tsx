import styles from "./styles.module.scss";
import ProductSearch from "../ProductSearch/catalog";
import AllPrice from "../../services/DataPrice/allPrice";
import React, { useState } from "react";

function Catalog() {
  const [numberQuantity, setNumberQuantity] = useState(1);
  const handleClick2 = () => {
    setNumberQuantity(numberQuantity + 12);
  };

  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h2 className={styles.textH2}>Catalog</h2>
        <div className={styles.areaForCards}>
          <ProductSearch />
        </div>
        <div className={styles.forCards}>
          <AllPrice quantity={numberQuantity} />
        </div>
        <div className={styles.forButton}>
          <button className={styles.button} onClick={handleClick2}>
            Show more
          </button>
        </div>
      </section>
    </div>
  );
}

export default Catalog;
