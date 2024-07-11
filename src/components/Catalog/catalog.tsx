import styles from "./styles.module.scss";
import ProductSearch from "../ProductSearch/catalog";
import AllPrice from "../../services/DataPrice/allPrice";
import React, { useEffect, useState } from "react";
// import shoppingCartIcon2 from "../../assets/Add control.png";

// import ButtonMinus from "../../assets/ButtonMinus.png";
// import ButtonPlus from "../../assets/ButtonPlus.png";

function Catalog() {
  const [answer, setAnswer] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [selectedProduct, setSelectedProduct] = useState<catalogState | null>(
  //   null
  // );

  // const onIncrementQuantity = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const onDecrementQuantity = () => {
  //   if (quantity > 0) {
  //     setQuantity((prevQuantity) => prevQuantity - 1);
  //   }
  // };

  const handleClick2 = () => {
    setAnswer("https://bartcevich.github.io/letter/image/forStore.png");
  };

  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h2 className={styles.textH2}>Catalog</h2>
        <div className={styles.areaForCards}>
          <ProductSearch />
        </div>
        <div className={styles.forCards}>
          <AllPrice />
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
