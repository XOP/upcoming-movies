import { Link } from "react-router-dom";

import styles from "./MovieCard.module.css";

const MovieCard = ({
  id,
  title,
  imgSrc,
  summary,
  releaseDate,
  linkTo = {},
  onClick = () => null,
}) => {
  return (
    <Link to={linkTo} className={styles.root} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.media}>
          <div className={styles["media-left"]}>
            <img src={imgSrc} alt={title} className={styles.image} />
          </div>
          <div className={styles["media-right"]}>
            <div>
              <small>Coming up on: {releaseDate}</small>
            </div>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.description}>{summary}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { MovieCard };
