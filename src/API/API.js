import { API_KEY } from "../configHTTP";
import { requestFlick, requestSwapi } from "../service/request";

export class API {
  async getStarShips({ page }) {
    const response = await requestSwapi({
      url: `starships?page=${page}`,

      method: "get",
    });

    return response.data;
  }

  async infoFIlm({ id }) {
    const response = await requestSwapi({
      url: `/films/${id}`,

      method: "get",
    });

    return response.data;
  }
  async searchImage({ query, page }) {
    const response = await requestFlick({
      url: `?method=flickr.photos.search&api_key=${API_KEY}&text=${query}&format=json&nojsoncallback=1&per_page=20&page=${page}`,
      method: "get",
    });
    return response.data;
  }
}
