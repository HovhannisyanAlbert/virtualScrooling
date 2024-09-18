import { GetImages } from "../thunk/thunk";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  imagesURL: [],
  pagesCount: 0,
  currentPage: 1,
  totalPages: 1,
  favoriteImagesURL: [],
  favoriteImageCount: 0,
};

const flickSlice = createSlice({
  name: "flick",
  initialState,
  reducers: {
    setImagesURL: (state, action) => {
      state.imagesURL = [...state.imagesURL, ...action.payload];
    },
    setPagesCount: (state, action) => {
      state.totalPages = action.payload;
    },
    setFavoriteImageURL: (state, action) => {
      const imageURL = action.payload;
      const isFavorite = state.favoriteImagesURL.includes(imageURL);

      if (isFavorite) {
        state.favoriteImagesURL = state.favoriteImagesURL.filter(
          (url) => url !== imageURL
        );
        state.favoriteImageCount -= 1;
      } else {
        state.favoriteImagesURL = [...state.favoriteImagesURL, imageURL];
        state.favoriteImageCount += 1;
      }
    },
    clearImages: (state, action) => {
      state.imagesURL = [];
    },
    removeFavoriteImages: (state, action) => {
      state.favoriteImagesURL = state.favoriteImagesURL.filter(
        (image) => image !== action.payload
      );
      state.imagesURL = state.imagesURL.filter(
        (image) => image !== action.payload
      );
      state.favoriteImageCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetImages.fulfilled, (state, action) => {
      state.imagesURL = [...state.imagesURL, ...action.payload];
      state.currentPage += 1;
    });
  },
});
export const {
  setImagesURL,
  setPagesCount,
  setFavoriteImageURL,
  clearImages,
  removeFavoriteImages,
} = flickSlice.actions;
export default flickSlice;
