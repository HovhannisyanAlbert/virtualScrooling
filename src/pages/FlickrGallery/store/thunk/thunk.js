import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../API/API";
import { setImagesURL, setPagesCount } from "../flickSlice/flickSlice";

const WBAPI = new API();
export const GetImages = createAsyncThunk(
  "get/image",
  async ({ query, page }, thunkAPI) => {
    const response = await WBAPI.searchImage({ query, page });

    const photoUrls = response.photos.photo.map((photo) => {
      return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
    });
    thunkAPI.dispatch(setPagesCount(response.photos.pages));
    thunkAPI.dispatch(setImagesURL(photoUrls));
    return photoUrls;
  }
);
