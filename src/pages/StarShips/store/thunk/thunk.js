import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../API/API";
import { singleFilm, starShipsData } from "../starShipsSlice/starShipsSlice";

const WBAPI = new API();

export const GetStarShipsData = createAsyncThunk(
  "star/ships/get",
  async ({ page }, thunkAPI) => {
    try {
      const response = await WBAPI.getStarShips({ page });
      thunkAPI.dispatch(starShipsData(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetStartFilm = createAsyncThunk(
  "star/film",
  async ({ id }, thunkAPI) => {
    try {
      const response = await WBAPI.infoFIlm({ id });
      thunkAPI.dispatch(singleFilm(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
