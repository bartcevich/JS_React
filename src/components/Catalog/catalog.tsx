import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import { getCatalog } from "../../services/getData";
import shoppingCartIcon2 from "../../assets/Add control.png";
import overlayImage from "../../assets/Hover.png";
import ButtonMinus from "../../assets/ButtonMinus.png";
import ButtonPlus from "../../assets/ButtonPlus.png";

type catalogState = {
  price: string;
  name: string;
  image: string;
  ID: number;
};

function Catalog() {
  const CatalogData = getCatalog();
  const [answer, setAnswer] = useState("");
  const [allFound, setAllFound] = useState<catalogState[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<catalogState | null>(
    null
  );

  useEffect(() => {
    const foundDinner = CatalogData.filter((item) => item.image === answer);
    setAllFound(foundDinner);
  }, [answer]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enteredAnswer: string = e.target.value;
    setAnswer(enteredAnswer);
  };

  const onShowProduct = (product: catalogState) => {
    product;
  };

  const onPrinterClick = (product: catalogState) => {
    setSelectedProduct(product);
  };
  // const onPrinterClick = (e: { stopPropagation: () => void }) => {
  //   e.stopPropagation();
  // };

  const onIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const onDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleClick2 = () => {
    setAnswer("https://bartcevich.github.io/letter/image/forStore.png");
  };
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h2 className={styles.textH2}>Catalog</h2>
        <div className={styles.areaForCards}>
          <select
            className={styles.text}
            onChange={handleAnswerChange}
            value={answer}
            id="contactAnswer"
            name="answer"
          >
            <option value="Search by title">Search by title</option>
            <optgroup label="Категории">
              <option value="https://bartcevich.github.io/letter/image/forStore.png">
                обувь
              </option>
            </optgroup>
          </select>
          <div className={styles.forCards}>
            {allFound.length > 0}
            {allFound.map((menuItem, index) => (
              <div
                key={index}
                className={styles.menuItem}
                onClick={() => onShowProduct(menuItem)}
              >
                <div className={styles.wrapper}>
                  <div className={styles.imageContainer}>
                    <img src={menuItem.image} alt="Image" />
                    <div className={styles.hoverContent}>
                      <img src={overlayImage} alt="Image" />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div className={styles.label}>
                      <div className={styles.name}>{menuItem.name}</div>
                      <div className={styles.price}>{menuItem.price}</div>
                    </div>
                    {selectedProduct?.ID === menuItem.ID ? (
                      <div className={styles.quantityButtons}>
                        <button onClick={onDecrementQuantity}>
                          <img src={ButtonMinus} alt="Button Minus" />
                        </button>
                        <span>{quantity} item</span>
                        <button onClick={onIncrementQuantity}>
                          <img src={ButtonPlus} alt="Button Plus" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.CartIcon2}
                        onClick={() => onPrinterClick(menuItem)}
                      >
                        <img
                          src={shoppingCartIcon2}
                          alt="иконка корзины покупок"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
