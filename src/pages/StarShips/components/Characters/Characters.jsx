import React from "react";
import styles from "./characters.module.css";
import { useCharacters } from "../../store/selector";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sortCharacters } from "../../store/starShipsSlice/starShipsSlice";
import { sliceUrlFilmsPeople } from "../../../../untill";

const Characters = () => {
  const characters = useCharacters();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSort = (sortBy) => {
    dispatch(sortCharacters({ sortBy }));
  };
  return (
    <div className={styles.characterWrapper}>
      {characters && characters.length > 0 ? (
        characters.map((character, index) => (
          <div className={styles.character} key={index}>
            <div className={styles.characterContent}>
              <span className={styles.characterName}>
                {" "}
                {sliceUrlFilmsPeople(character)}{" "}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noCharacters}>No characters available.</p>
      )}

      <div className={styles.sortBttn}>
        <button onClick={() => handleSort("asc")} className={styles.asc}>
          {" "}
          Asc{" "}
        </button>
        <button onClick={() => handleSort("desc")} className={styles.desc}>
          {" "}
          Desc{" "}
        </button>
      </div>

      <button onClick={() => navigate("/")} className={styles.back}>
        {" "}
        Back
      </button>
    </div>
  );
};

export default Characters;
