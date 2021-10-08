import styles from "./MovieModal.module.css";

const MovieModal = ({
  id,
  title,
  releaseDate,
  imgSrc,
  length,
  contentRating,
  summary,
  castStars,
  trailer,
  isLoading,
  isError,
  isOpen,
  onClose = () => null
}) => {
  // ===============================
  console.log("trailer data");
  console.log(trailer);
  // ===============================

  if (!isOpen) return null;

  return (
    <div className={styles.root}>
      <div className={styles.overlay}></div>
      <section id={id} className={styles.wrapper}>
        <div className={styles.close} onClick={onClose}>Close</div>

        {isError && <div>SOMETHING WENT OOPS. HOLD YOUR POPCORN.</div>}

        {isLoading && <div>LOADING...</div>}

        {!isError && !isLoading && (
          <div>
            <h1>{title}</h1>
            <div>Release date: {releaseDate}</div>
            <img src={imgSrc} alt={title} width="250" />
            <div>length: {length}</div>
            {contentRating && <div>rating: {contentRating}</div>}
            <article>{summary}</article>
            <small>{castStars}</small>
          </div>
        )}

      </section>
    </div>
  );
};

export { MovieModal };
