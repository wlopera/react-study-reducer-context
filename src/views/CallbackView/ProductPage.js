import React, { useCallback } from "react";
import ProductForm from "./ProductForm";

import styles from "./CallbackView.module.css";

const ProductPage = ({ theme, id }) => {
  const handleSubmit = useCallback(
    (data) => {
      console.log([theme, id]);
      console.log("Enviar data: ", data);
    },
    [id]
  );

  console.log(["ProductPage", ProductPage]);

  return (
    <div className={Object.is("dark", theme) ? styles.dark : styles.light}>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductPage;
