import React, { memo, useState } from "react";

import styles from "./CallbackView.module.css";

const ProductForm = memo(function ProductForm({ onSubmit }) {
  const [count, setCount] = useState(0);

  console.log("[LENTITUD FORZADA] RENDERIZANDO... <ProductForm />");

  let startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // No hace nada por 3000 ms (3s) para emular un componente lento
  }

  const sendData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = {
      ...Object.fromEntries(formData),
    };

    onSubmit(input);
  };

  console.log(["ProductForm", ProductForm]);
  return (
    <div className={styles.productForm}>
      <div className={styles.count}>
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <label>{count}</label>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
      <form className={styles.form} onSubmit={sendData}>
        <input name="login" />
        <input name="password" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
});

export default ProductForm;
