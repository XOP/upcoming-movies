
import Heading from "wombat/dist/components/heading/Heading";
import Modal from "wombat/dist/components/modal/Modal";
import Space from "wombat/dist/components/space/Space";

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
  onClose = () => null,
}) => {
  // ===============================
  // console.log("trailer data");
  // console.log(trailer);
  // ===============================

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <section id={id}>
        {isError && <div>SOMETHING WENT OOPS. HOLD YOUR POPCORN.</div>}

        {isLoading && <div>LOADING...</div>}

        {!isError && !isLoading && (
          <div className={styles.content}>
            <Space size='3' />
            <Heading level="3" as="h1" colorInherit mb='2'>
              {title}
            </Heading>
            <div>Release date: {releaseDate}</div>
            <img src={imgSrc} alt={title} width="250" />
            <div>length: {length}</div>
            {contentRating && <div>rating: {contentRating}</div>}
            <article>{summary}</article>
            <small>{castStars}</small>
          </div>
        )}
      </section>
    </Modal>
  );
};

export { MovieModal };
