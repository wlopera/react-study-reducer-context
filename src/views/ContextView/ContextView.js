import { useState } from "react";
import List from "./List.js";
import { SizeContext } from "./SizeContext.js";

export default function ContentView() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={(e) => {
            setIsLarge(e.target.checked);
          }}
        />
        Usa imágenes grandes
      </label>
      <hr />
      <SizeContext.Provider value={imageSize}>
        <List />
      </SizeContext.Provider>
    </>
  );
}
