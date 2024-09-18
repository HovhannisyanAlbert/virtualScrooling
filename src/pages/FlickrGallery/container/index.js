import React, { useState, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { GetImages } from "../store/thunk/thunk";
import styles from "./flick.module.css";
import { useFavoiteImageCount } from "../store/selector";
import { Link } from "react-router-dom";
import { clearImages } from "../store/flickSlice/flickSlice";

const Images = lazy(() => import("../components/Images/Images"));

const FlickrGallery = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const favoriteCount = useFavoiteImageCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      localStorage.setItem("query", query);
      dispatch(clearImages());
      dispatch(GetImages({ query, page: 1 }));
    }
  };

  return (
    <div className={styles.wrapperFlick}>
      <div className={styles.container}>
        <div className={styles.favoriteWrapper}>
          <Link to="/favorite"> Favorite</Link>

          <span className={styles.favorite}> {favoriteCount}</span>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <Suspense fallback={<div>Loading images...</div>}>
        <Images />
      </Suspense>
    </div>
  );
};

export default FlickrGallery;
