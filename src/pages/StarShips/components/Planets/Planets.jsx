import React from "react";
import { usePlanets } from "../../store/selector";
import styles from "../Characters/characters.module.css";
import { useNavigate } from "react-router-dom";
import { sliceUrlFilmsPlanets } from "../../../../untill";
import { sortPlanets } from "../../store/starShipsSlice/starShipsSlice";
import { useDispatch } from "react-redux";
const Planets = () => {
  const planets = usePlanets();
  const naviaget = useNavigate();
  const dispatch = useDispatch();
  const handleSort = (sortBy) => {
    dispatch(sortPlanets({ sortBy }));
  };
  return (
    <div className={styles.characterWrapper}>
      {planets && planets.length > 0 ? (
        planets.map((planet, index) => (
          <div className={styles.character} key={index}>
            <div className={styles.characterContent}>
              <span className={styles.characterName}>
                {" "}
                {sliceUrlFilmsPlanets(planet)}{" "}
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
        <button onClick={() => naviaget("/")} className={styles.back}>
          {" "}
          Back
        </button>
      </div>
    </div>
  );
};

export default Planets;
