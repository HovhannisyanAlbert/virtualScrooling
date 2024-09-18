import React from "react";
import { useShips } from "../../store/selector";
import styles from "./stars.module.css";
import { Link } from "react-router-dom";

const Stars = () => {
  const ships = useShips();

  return (
    <div className={styles.container}>
      {ships.length > 0 ? (
        ships.map((elem) => (
          <div key={elem.name} className={styles.wrapperShips}>
            <div className={styles.name}>
              <h4>{elem.name}</h4>
            </div>
            <div className={styles.films}>
              {elem.films.map((filmUrl, index) => {
                const filmId = filmUrl.split("/").filter(Boolean).pop();
                return (
                  <Link
                    key={index}
                    to={`/film/${filmId}`}
                    className={styles.filmLink}
                  >
                    Film {index + 1}
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noShips}>No ships available</div>
      )}
    </div>
  );
};

export default Stars;
