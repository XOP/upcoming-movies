import { Link } from "react-router-dom";

import { routeNames, createRoute } from "../../../routes/routes";

import styles from "./MovieCard.module.css";

const MovieCard = ({ id, title, imgSrc, summary, releaseDate }) => {
  const route = createRoute(routeNames.ITEM, id);

  return (
    <Link
      to={{
        pathname: route,
        state: {
          id,
          title,
          releaseDate,
        },
      }}
      className={styles.root}
    >
      <div className={styles.content}>
        <div className={styles.media}>
          <div className={styles["media-left"]}>
            <img src={imgSrc} alt={title} className={styles.image} />
          </div>
          <div className={styles["media-right"]}>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.description}>{summary}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { MovieCard };
