import styles from "./styles.module.scss";
import React, { useState, useEffect } from "react";
import logoImage from "../../assets/Logo.png";
import shoppingCartIcon from "../../assets/cart.png";
import NumberUnits from "../../services/NunberUnits/NumberUnits";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectAllData, updateCartData } from "../../redux/cartSlice";
type cartState = {
  CartData: {};
  CardID: number;
  firstName: string;
  lastName: string;
  totalProducts: number;
};

const Navigation: React.FC = () => {
  const [isTop, setIsTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerDataUser = useSelector<RootState, cartState>(selectAllData);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //console.log("1=", lastScrollY, currentScrollY);
      if (currentScrollY > lastScrollY) {
        setIsTop(true);
        //console.log("2=", isTop);
      } else if (currentScrollY < lastScrollY) {
        setIsTop(false);
        //console.log("3=", isTop);
      }
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 743);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTop]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //const [openMenu1, setOpenMenu1] = useState(false);
  const handleClick1 = () => {
    //setOpenMenu1((prevValue) => !prevValue);
  };
  const handleClick3 = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${styles.wrapper1} ${isTop ? styles.top : ""} `}>
      <nav
        className={`${styles.siteNav} ${isTop ? styles.top : ""} ${
          isMobile ? styles.mobile : ""
        }`}
      >
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        {(!isMobile || isMenuOpen) && (
          <div className={styles.mobileMenu}>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle}>Catalog</div>
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle} onClick={handleClick1}>
                FAQ
              </div>
            </div>
            <div className={styles.dropdown3}>
              <Link to="/cart" className={styles.dropdownTitle}>
                Cart
              </Link>
              <img src={shoppingCartIcon} alt="иконка корзины покупок" />
              <div className={styles.dropdown3absolute}>
                {headerDataUser.totalProducts}
              </div>
            </div>
            <div className={styles.dropdown}>
              {headerDataUser.CardID !== -5 && (
                <div className={styles.dropdownTitle} onClick={handleClick3}>
                  {headerDataUser.firstName} {headerDataUser.lastName}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ""}
        }`}
          onClick={handleMenuToggle}
        >
          ☰
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
