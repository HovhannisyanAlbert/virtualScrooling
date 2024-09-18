import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetStarShipsData } from "../store/thunk/thunk";
import styles from "./starsShips.module.css";
import Stars from "../components/Stars/Stars";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const StarShips = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(GetStarShipsData({ page }))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        toast.error(err.detail);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage((next) => next + 1);
  };

  const handlePrevPage = () => {
    if (page === 0) {
      toast.error("Page can't be less than 0d");
      return;
    } else {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {" "}
        <Link to="/flick"> Go To Flick Page </Link>{" "}
      </div>

      <div className={styles.stars}>
        <Stars />
      </div>
      <div className={styles.bttnWrapper}>
        <button onClick={handleNextPage} className={styles.next}>
          {" "}
          Next Page
        </button>
        <span className={styles.page}> {page} </span>
        <button
          onClick={handlePrevPage}
          className={styles.prev}
          disabled={page === 0}
        >
          Prev Page
        </button>
      </div>
    </div>
  );
};

export default StarShips;
