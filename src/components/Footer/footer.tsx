import styles from "./styles.module.scss";
import React, { useState } from "react";
import logoImage from "../../assets/Logo.png";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick1 = () => {};
  //const [openMenu2, setOpenMenu2] = useState(false);
  const handleClick2 = () => {
    //setOpenMenu2((prevValue) => !prevValue);
  };

  return (
    <>
      <nav className={styles.siteNav}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src={logoImage} alt="logo" />
          </div>
        </div>
        <div className={styles.mobileMenu}>
          <div className={styles.dropdown}>
            <div className={styles.dropdownTitle} onClick={handleClick2}>
              Catalog
            </div>
          </div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownTitle} onClick={handleClick1}>
              FAQ
            </div>
          </div>
        </div>
        <div
          className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ""}
        }`}
          onClick={handleMenuToggle}
        >
          ☰
        </div>
      </nav>
    </>
  );
}
export default Navigation;
