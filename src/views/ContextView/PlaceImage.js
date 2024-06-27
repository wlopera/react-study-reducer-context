import { useContext } from "react";
import { getImageUrl } from "./utils.js";
import { SizeContext } from "./SizeContext.js";

export function PlaceImage({ place }) {
  const imageSize = useContext(SizeContext);

  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
