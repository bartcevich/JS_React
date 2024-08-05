import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonCartImg from "../../assets/ButtonCartImg.png";

export default function ButtonPlus() {
  // const [allPrice, setAllPrice] = useState<any[]>([]);
  // const [hasAddedItem, setHasAddedItem] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();
  // const cartUser = useSelector<RootState, cartState>(selectAllData);

  const onIncrementQuantity = () => {
    // const data: any = cartUser.CartData || [];
    // const objectFromArray = data[0] || {};
    // const products = objectFromArray.products;
    // setAllPrice(products);
    // console.log(products);
    // fetch("https://dummyjson.com/carts/1", {
    //   method: "PUT" /* or PATCH */,
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     merge: true, // this will include existing products in the cart
    //     products: [
    //       {
    //         id: 11,
    //         quantity: 1,
    //       },
    //     ],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
  };

  return (
    <button className={styles.buttonImg} onClick={onIncrementQuantity}>
      <img src={ButtonCartImg} alt="Button Plus" />
    </button>
  );
}
