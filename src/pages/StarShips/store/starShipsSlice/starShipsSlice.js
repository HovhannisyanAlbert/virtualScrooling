import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipsData: [],
  films: {},
  characters: [],
  planets: [],
};

const starShipsSlice = createSlice({
  name: "star",
  initialState,
  reducers: {
    starShipsData: (state, action) => {
      state.shipsData = action.payload.results;
    },
    singleFilm: (state, action) => {
      state.characters = action.payload.characters;
      state.planets = action.payload.planets;
    },
    sortCharacters: (state, action) => {
      const { sortBy } = action.payload;

      state.characters = [...state.characters].sort((a, b) => {
        const extractLastNumber = (url) => {
          const match = url.match(/people\/(\d+)\//);
          return match ? parseInt(match[1], 10) : 0;
        };

        const aNumber = extractLastNumber(a);
        const bNumber = extractLastNumber(b);

        if (sortBy === "asc") {
          return aNumber - bNumber;
        } else if (sortBy === "desc") {
          return bNumber - aNumber;
        }
        return 0;
      });
    },
    sortPlanets: (state, action) => {
      const { sortBy } = action.payload;

      state.planets = [...state.planets].sort((a, b) => {
        const extractLastNumber = (url) => {
          const match = url.match(/planets\/(\d+)\//);
          return match ? parseInt(match[1], 10) : 0;
        };

        const aNumber = extractLastNumber(a);
        const bNumber = extractLastNumber(b);

        if (sortBy === "asc") {
          return aNumber - bNumber;
        } else if (sortBy === "desc") {
          return bNumber - aNumber;
        }
        return 0;
      });
    },
  },
});
export const { starShipsData, singleFilm, sortCharacters, sortPlanets } =
  starShipsSlice.actions;
export default starShipsSlice;
