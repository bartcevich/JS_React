import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
// import { getCatalog } from "../../services/getData";

// type catalogState = {
//   price: string;
//   name: string;
//   image: string;
//   ID: number;
// };

function Catalog() {
  // const CatalogData = getCatalog();
  const [answer, setAnswer] = useState("");
  // const [allFound, setAllFound] = useState<catalogState[]>([]);

  // useEffect(() => {
  //   const foundDinner = CatalogData.filter((item) => item.image === answer);
  //   setAllFound(foundDinner);
  // }, [answer]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enteredAnswer: string = e.target.value;
    setAnswer(enteredAnswer);
  };

  return (
    <div className={styles.container}>
      <section className={styles.content}>
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
        </div>
      </section>
    </div>
  );
}

export default Catalog;
