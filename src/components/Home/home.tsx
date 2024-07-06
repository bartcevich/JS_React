import styles from "./styles.module.scss";

function Home() {
  //const [openMenu2, setOpenMenu2] = useState(false);
  const handleClick2 = () => {
    //setOpenMenu2((prevValue) => !prevValue);
  };
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.textH1}>
          Any products from famous brands <br /> with worldwide delivery
        </h1>
        <b className={styles.text}>
          We sell smartphones, laptops, clothes, shoes <br /> and many other
          products at low prices
        </b>
        <button className={styles.button} onClick={handleClick2}>
          Go to shopping
        </button>
      </section>
    </div>
  );
}

export default Home;
