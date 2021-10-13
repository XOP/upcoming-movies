import { Link } from "react-router-dom";

import Card from "wombat/lib/components/card/Card";
import Heading from "wombat/lib/components/heading/Heading";
import Media from "wombat/lib/components/layout/Media";
import Picture from "wombat/lib/components/picture/Picture";

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
        <Media
          align="start"
          start={
            <Picture
              src={imgSrc}
              alt={title}
              className={styles.image}
              height="14rem"
              aspectRatio='3:4'
            />
          }
          space="1.5"
        >
          <small className={styles.annotation}>
            Coming up on: {releaseDate}
          </small>
          <Heading as="h2" level="4" colorInherit align="left" mb="0.5">
            {title}
          </Heading>
          <div className={styles.description}>{summary}</div>
        </Media>
      </Card>
    </Link>
  );
};

export { MovieCard };
