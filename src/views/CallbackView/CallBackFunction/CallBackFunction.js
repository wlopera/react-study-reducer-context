import React, { useCallback, useState } from "react";
import MyComponent from "./MyComponent";

let add = 0;
const CallBackFunction = () => {
  const [cont, setCont] = useState(0);

  const handleFunction = useCallback(() => {
    console.log(1111111111);
    add++;
    return add;
  }, [cont]);

  return (
    <div>
      <div>
        <button onClick={() => setCont((prev) => prev + 1)}>+</button>
        {cont}
        <button onClick={() => setCont((prev) => prev - 1)}>-</button>
      </div>
      <button onClick={() => handleFunction()}>LLamar Función</button>
      <MyComponent row={handleFunction} />
    </div>
  );
};

export default CallBackFunction;
