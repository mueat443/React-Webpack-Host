import React, { useEffect, useState, useContext } from 'react';
import { ProductStateContext } from "../context/ProductStateContext";
import { LanguageStateContext } from "../context/LanguageStateContext";

const ProductComponent = () => {
  const { cart, setCart } = useContext(ProductStateContext);
  const { languageState } = useContext(LanguageStateContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const onFlutterReady = (event) => {      
      const data = JSON.parse(event.detail.getStateAsString());
      setCart(data.cart);
    };

    window.addEventListener('flutter-shopping', onFlutterReady);

    return () => {
      window.removeEventListener('flutter-shopping', onFlutterReady);
    };
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <p>{languageCountConvert(languageState)} {cart.length}</p>
  );
};

export default ProductComponent;
function languageCountConvert(languageKey) {
  if (languageKey === "th") {
    return "จำนวนสินค้า: ";
  } else if (languageKey === "en") {
    return "Item Count: ";
  } else {
    return "Unknown Language";
  }
}