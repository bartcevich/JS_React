import styles from "./styles.module.scss";
import Home from "../Home/home";
// import Header from "../Header/header";
// import Footer from "../Footer/footer";
import Catalog from "../Catalog/catalog";
import FAQ from "../FAQ/faq";

function Body() {
  return (
    <div className={styles.bodyWrapper}>
      {/* <Header /> */}
      <Home />
      <Catalog />
      <FAQ />
      {/* <Footer /> */}
    </div>
  );
}

export default Body;
