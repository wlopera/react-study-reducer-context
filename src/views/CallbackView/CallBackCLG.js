import React, { useState, useCallback, useEffect, useRef } from "react";

function CallBackCLG() {
  const [contador, setContador] = useState(0);
  const [contador2, setContador2] = useState(0);

  const incrementarSinCallback = () => {
    setContador(contador + 1);
  };

  const incrementarConCallback = useCallback(() => {
    setContador2((prevContador) => prevContador + 1);
  }, []);

  const prevIncrementarSinCallbackRef = useRef();
  const prevIncrementarConCallbackRef = useRef();

  useEffect(() => {
    console.log("incrementarSinCallback:", incrementarSinCallback);
    console.log("incrementarConCallback:", incrementarConCallback);
    console.log(
      "incrementarSinCallback ha cambiado:",
      prevIncrementarSinCallbackRef.current !== incrementarSinCallback
    );
    console.log(
      "incrementarConCallback ha cambiado:",
      prevIncrementarConCallbackRef.current !== incrementarConCallback
    );

    // Actualiza las referencias anteriores
    prevIncrementarSinCallbackRef.current = incrementarSinCallback;
    prevIncrementarConCallbackRef.current = incrementarConCallback;
  });

  return (
    <div>
      <h1>Contador sin useCallback: {contador}</h1>
      <button onClick={incrementarSinCallback}>
        Incrementar sin useCallback
      </button>
      <h1>Contador con useCallback: {contador2}</h1>
      <button onClick={incrementarConCallback}>
        Incrementar con useCallback
      </button>
    </div>
  );
}

export default CallBackCLG;
