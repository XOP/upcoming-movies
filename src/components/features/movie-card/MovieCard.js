import { Link } from "react-router-dom";

import Card from "wombat/dist/components/card/Card";
import Heading from "wombat/dist/components/heading/Heading";

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
      <Card className={styles.content}>
        <div className={styles.media}>
          <div className={styles["media-left"]}>
            <span className={styles.picture}>
              <img src={imgSrc} alt={title} className={styles.image} />
            </span>
          </div>
          <div className={styles["media-right"]}>
            <small className={styles.annotation}>
              Coming up on: {releaseDate}
            </small>
            <Heading as="h2" level="4" colorInherit align="left" mb="0.5">
              {title}
            </Heading>
            <div className={styles.description}>{summary}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export { MovieCard };
