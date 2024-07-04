import React, { useState } from "react";
import ProductPage from "./ProductPage";

import styles from "./CallbackView.module.css";
import CallBackCLG from "./CallBackCLG";
import CallBackFunction from "./CallBackFunction/CallBackFunction";

const CallbackView = () => {
  const [isDark, setIsDark] = useState(false);
  const [id, setId] = useState(1);
  return (
    <div className={styles.container}>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Oscuro
      </label>
      <button onClick={() => setId((prev) => prev + 1)}>
        Incrementar el ID
      </button>
      <ProductPage theme={isDark ? "dark" : "light"} id={id} />
      {/* <div>
        <CallBackCLG />
      </div> */}
      <div>
        <CallBackFunction />
      </div>
    </div>
  );
};

export default CallbackView;
