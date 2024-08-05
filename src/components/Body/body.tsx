import styles from "./styles.module.scss";
import Home from "../Home/home";
import Catalog from "../Catalog/catalog";
import FAQ from "../FAQ/faq";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  updateCartData,
  updateCardID,
  updateIDforUpdateCart,
  updateFirstName,
  updateLastName,
  updateTotalProducts,
  updateTotal,
  updateDiscountedTotal,
} from "../../redux/cartSlice";

export default function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const fetchDataCart = async (dataForCarts: { id: number }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/user/${dataForCarts.id}`
      );
      const data = await response.json();
      const carts = data.carts;
      const objectFromArray = carts[0] || {};
      dispatch(updateIDforUpdateCart(objectFromArray.id));
      dispatch(updateTotalProducts(objectFromArray.totalProducts));
      dispatch(updateTotal(objectFromArray.total));
      dispatch(updateDiscountedTotal(objectFromArray.discountedTotal));
      dispatch(updateCartData(objectFromArray.products));
    } catch (error) {
      console.error(error);
    }
  };

  const dataInRedux = (data: {
    firstName: string;
    lastName: string;
    id: number;
  }) => {
    if (
      typeof data === "object" &&
      data !== null &&
      Object.keys(data).length > 0
    ) {
      dispatch(updateCardID(data.id));
      dispatch(updateFirstName(data.firstName));
      dispatch(updateLastName(data.lastName));
      fetchDataCart(data);
    }
  };

  const currentAuth: any = localStorage.getItem("dataUser");
  let parsedCurrentAuth: any = {};
  if (currentAuth) {
    parsedCurrentAuth = JSON.parse(currentAuth);
  }

  useEffect(() => {
    const fetchDataToken = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `${parsedCurrentAuth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized request");
        }

        const data = await response.json();
        dataInRedux(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchDataToken();
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      <Home />
      <Catalog />
      <FAQ />
    </div>
  );
}
