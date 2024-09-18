import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetStartFilm } from "../../store/thunk/thunk";

import styles from "./infoFilm.module.css";
const InfoFilm = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStartFilm({ id }));
  }, [id]);

  return (
    <div className={styles.filmContainer}>
      <div className={styles.categoryFilms}>
        <Link to="/characters" className={styles.characters}>
          {" "}
          Characters
        </Link>
        <Link to="/planets" className={styles.planets}>
          Planets
        </Link>
      </div>
    </div>
  );
};

export default InfoFilm;
