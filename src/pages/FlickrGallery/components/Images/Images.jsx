import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import {
  useCurrentPage,
  useFavoriteImageURL,
  useImageURL,
  useTotalPages,
} from "../../store/selector";
import { GetImages } from "../../store/thunk/thunk";
import { setFavoriteImageURL } from "../../store/flickSlice/flickSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./images.module.css";
import Spinner from "../Spinner/Spinner";
import {
  AutoSizer,
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
} from "react-virtualized";

const cache = new CellMeasurerCache({
  defaultHeight: 300,
  defaultWidth: 300,
  fixedWidth: true,
});

const Images = () => {
  const images = useImageURL();
  const currentPage = useCurrentPage();
  const totalPages = useTotalPages();
  const favoriteImage = useFavoriteImageURL();
  const dispatch = useDispatch();

  const [columnCount, setColumnCount] = useState(getColumnCount());
  const [fullScreenImage, setFullScreenImage] = useState({
    image: "",
    index: 0,
  });
  const [loading, setLoading] = useState(false);

  function getColumnCount() {
    const width = window.innerWidth;
    switch (true) {
      case width < 400:
        return 1;
      case width < 600:
        return 2;
      case width < 800:
        return 3;
      case width < 1000:
        return 4;
      case width < 1200:
        return 5;
      case width < 1500:
        return 6;
      case width < 1800:
        return 5;
      default:
        return 8;
    }
  }

  const handleResize = debounce(() => {
    setColumnCount(getColumnCount());
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const toggleFavorite = (urlImage) => {
    dispatch(setFavoriteImageURL(urlImage));
  };
  const query = localStorage.getItem("query");
  const handleScroll = useCallback(
    debounce(() => {
      const bottom =
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        window.innerHeight;

      if (bottom <= 50 && currentPage < totalPages && !loading) {
        if (query) {
          setLoading(true);

          dispatch(GetImages({ query, page: currentPage + 1 })).finally(() => {
            setLoading(false);
          });
        }
      }
    }, 300),
    [currentPage, totalPages, loading, query, dispatch]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const getColumnWidth = (gridWidth) => {
    const margin = 10;
    return (gridWidth - margin * (columnCount - 1)) / columnCount;
  };

  const viewImage = (image, index) => {
    setFullScreenImage({ image, index });
  };

  const imageAction = (action) => {
    let index = fullScreenImage.index;
    if (action === "next") {
      const nextIndex = index + 1;
      if (nextIndex < images.length) {
        setFullScreenImage({ image: images[nextIndex], index: nextIndex });
      }
    }
    if (action === "prev") {
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        setFullScreenImage({ image: images[prevIndex], index: prevIndex });
      }
    }
    if (action === "close") {
      setFullScreenImage({ image: "", index: 0 });
    }
  };

  const renderImage = ({ columnIndex, rowIndex, key, parent, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= images.length) return null;

    const imageUrl = images[index];
    const isFavorite = favoriteImage.includes(imageUrl);

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        <div
          className={styles.imageWrapper}
          style={{ ...style, margin: "10px" }}
        >
          <img
            src={imageUrl}
            alt={`Image ${index}`}
            className={styles.image}
            onClick={() => viewImage(imageUrl, index)}
          />
          <div
            className={`${styles.favoriteIcon} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={() => toggleFavorite(imageUrl)}
          >
            {isFavorite ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </div>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <>
      {fullScreenImage.image && (
        <div className={styles.fullScreenContainer}>
          <button
            className={styles.delete}
            onClick={() => imageAction("close")}
          >
            {" "}
            X{" "}
          </button>

          <button onClick={() => imageAction("prev")} className={styles.prev}>
            Prev
          </button>
          <img
            src={fullScreenImage.image}
            alt="fullScreen"
            className={styles.fullImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={() => imageAction("next")} className={styles.next}>
            {" "}
            Next{" "}
          </button>
        </div>
      )}

      <div className={styles.imagesContainer}>
        {images.length > 0 && (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Grid
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    columnCount={columnCount}
                    columnWidth={getColumnWidth(width)}
                    rowCount={Math.ceil(images.length / columnCount)}
                    rowHeight={310}
                    width={width}
                    cellRenderer={renderImage}
                    overscanRowCount={3}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}

        {loading && <Spinner />}
      </div>
    </>
  );
};

export default Images;
