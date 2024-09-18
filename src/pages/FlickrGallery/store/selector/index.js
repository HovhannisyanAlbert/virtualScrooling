import { useSelector } from "react-redux";

export const useImageURL = () => useSelector((state) => state.flick.imagesURL);
export const usePagesCount = () =>
  useSelector((state) => state.flick.pagesCount);
export const useFavoriteImageURL = () =>
  useSelector((state) => state.flick.favoriteImagesURL);
export const useFavoiteImageCount = () =>
  useSelector((state) => state.flick.favoriteImageCount);

export const useCurrentPage = () =>
  useSelector((state) => state.flick.currentPage);

export const useTotalPages = () =>
  useSelector((state) => state.flick.totalPages);
