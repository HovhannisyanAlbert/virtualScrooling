import { useSelector } from "react-redux";

export const useShips = () => useSelector((state) => state.star.shipsData);
export const useCharacters = () =>
  useSelector((state) => state.star.characters);
export const usePlanets = () => useSelector((state) => state.star.planets);
