import styles from "./MovieCard.module.css";

const MovieCard = ({ id, title, imgSrc, summary, onClick = () => null}) => {
  return (
    <div onClick={() => onClick(id)}>
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
    </div>
  );
};

export { MovieCard };
