import { configureStore } from "@reduxjs/toolkit";
import starShipsSlice from "../pages/StarShips/store/starShipsSlice/starShipsSlice";
import flickSlice from "../pages/FlickrGallery/store/flickSlice/flickSlice";

export const store = configureStore({
  reducer: {
    [starShipsSlice.name]: starShipsSlice.reducer,
    [flickSlice.name]: flickSlice.reducer,
  },
  devTools: true,
});
