import Place from "./Place.js";
import { places } from "./data.js";

export default function List() {
  const listItems = places.map((place) => (
    <li key={place.id}>
      <Place place={place} />
    </li>
  ));
  return <ul style={{ listStyleType: "none" }}>{listItems}</ul>;
}
