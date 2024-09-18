import React from "react";
import { useFavoriteImageURL } from "../../store/selector";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./favorite.module.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFavoriteImages } from "../../store/flickSlice/flickSlice";

const Favorite = () => {
  const favoriteImages = useFavoriteImageURL();
  const dispatch = useDispatch();

  const handleDelete = (imageUrl) => {
    dispatch(removeFavoriteImages(imageUrl));
  };

  return (
    <div className={styles.favoriteWrapper}>
      <h4 className={styles.title}>Favorite Images</h4>
      {favoriteImages.length > 0 ? (
        <div className={styles.imagesContainer}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {favoriteImages.map((image, index) => (
                <div key={index} className={styles.galleryItemWrapper}>
                  <img
                    src={image}
                    alt={`Favorite ${index}`}
                    className={styles.galleryItem}
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleDelete(image)}
                    className={styles.deleteButton}
                    aria-label="Delete image"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      ) : (
        <p className={styles.noImages}>No favorite images yet.</p>
      )}

      <Link to="/flick" className={styles.back}>
        Back
      </Link>
    </div>
  );
};

export default Favorite;
